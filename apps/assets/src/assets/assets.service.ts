import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AbstractService, ID, SortParams } from '@zeowna/common';
import { Asset } from './entities/asset.entity';
import { AssetsMongooseRepository } from './assets-mongoose.repository';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { PlainCompany, PlainUnitInterface } from '@zeowna/entities-definition';
import { AssetCompaniesService } from '../companies/asset-companies.service';
import { AssetUnitsService } from '../units/asset-units.service';
import { UpdateAssetHealthLevelDto } from './dto/update-asset-health-level.dto';
import { KafkaProducer, TopicsEnum } from '@zeowna/kafka';
import {
  AssetUnit,
  AssetUnitDocument,
} from '../units/entities/asset-unit.entity';
import {
  AssetCompany,
  AssetCompanyDocument,
} from '../companies/entities/asset-company.entity';
import { AssetStatusEnum } from './entities/asset-status.enum';
import { NestLoggerService } from '@zeowna/logger';

@Injectable()
export class AssetsService extends AbstractService<
  Asset,
  CreateAssetDto,
  UpdateAssetDto
> {
  constructor(
    private readonly repository: AssetsMongooseRepository,
    private readonly companyService: AssetCompaniesService,
    private readonly unitService: AssetUnitsService,
    private readonly kafkaProducer: KafkaProducer,
    private readonly logger: NestLoggerService,
  ) {
    super(repository, logger);
  }

  async findAllByOwnerId(
    ownerId: string,
    skip = 0,
    limit = 10,
    sort: SortParams = { createdAt: -1 },
    correlationId: string,
  ) {
    this.logger.info('AssetsService.findAllByOwnerId()', {
      ownerId,
      skip,
      limit,
      sort,
      correlationId,
    });
    return this.repository.findAllByOwnerId(ownerId, skip, limit, sort);
  }

  async findByIdAndOwnerId(id: ID, ownerId: string, correlationId: string) {
    this.logger.info('AssetsService.findByIdAndOwnerId()', {
      id,
      ownerId,
      correlationId,
    });

    const found = await this.repository.findByIdAndOwnerId(id, ownerId);

    if (!found) {
      throw new NotFoundException(
        `${this.repository.entityName} not found with id: ${id}`,
      );
    }

    return found;
  }

  async create(createAssetDto: CreateAssetDto, correlationId: string) {
    this.logger.info('AssetsService.create()', {
      createAssetDto,
      correlationId,
    });

    const owner = await this.companyService.findById(
      createAssetDto.ownerId,
      correlationId,
    );
    const unit = await this.unitService.findById(
      createAssetDto.unitId,
      correlationId,
    );

    /**
     * @TODO: Move it to a custom Validation if Possible
     */
    if (owner.id !== unit.companyId) {
      throw new BadRequestException(
        `Owner and Unit doesn't match owner: ${owner._id} and unit.company._id: ${unit.companyId}`,
      );
    }

    createAssetDto.owner = owner
      ? owner
      : new AssetCompany({
          id: createAssetDto.ownerId,
        } as AssetCompanyDocument);

    createAssetDto.unit = unit
      ? unit
      : new AssetUnit({ id: createAssetDto.unitId } as AssetUnitDocument);

    return super.create(createAssetDto, correlationId);
  }

  async updateAssetCompany(company: PlainCompany, correlationId: string) {
    this.logger.info('AssetService.updateAssetCompany()', {
      company,
      correlationId,
    });

    await this.repository.updateAssetCompany(
      new AssetCompany(company as unknown as AssetCompanyDocument),
    );
  }

  async updateAssetUnit(unit: PlainUnitInterface, correlationId: string) {
    this.logger.info('AssetService.updateAssetUnit()', { unit, correlationId });

    await this.repository.updateAssetUnit(
      new AssetUnit({
        ...unit,
        companyId: unit.company.id,
      } as unknown as AssetUnitDocument),
    );
  }

  private async updateStatus(
    id: ID,
    status: AssetStatusEnum,
    correlationId: string,
  ) {
    this.logger.info('AssetService.updateStatus()', {
      id,
      status,
      correlationId,
    });

    const found = await this.findById(id, correlationId);

    return this.repository.updateStatus(found.id, status);
  }

  private updateStatusByHealthLevel(
    id: ID,
    healthLevel: number,
    correlationId: string,
  ) {
    this.logger.info('AssetService.updateAssetCompany()', { id, healthLevel });

    const isAlerting = healthLevel >= 0.75 && healthLevel <= 0.95;
    const isStopped = healthLevel < 0.75;

    if (isAlerting) {
      return this.updateStatus(id, AssetStatusEnum.Alerting, correlationId);
    }

    if (isStopped) {
      return this.updateStatus(id, AssetStatusEnum.Stopped, correlationId);
    }

    return this.updateStatus(id, AssetStatusEnum.Running, correlationId);
  }

  async updateHealthLevel(
    id: string,
    ownerId: string,
    updateAssetHealthLevelDto: UpdateAssetHealthLevelDto,
    correlationId: string,
  ) {
    this.logger.info('AssetService.updateHealthLevel()', {
      id,
      ownerId,
      updateAssetHealthLevelDto,
      correlationId,
    });

    const found = await this.findByIdAndOwnerId(id, ownerId, correlationId);
    await this.repository.updateHealthLevel(
      found.id as string,
      updateAssetHealthLevelDto.healthLevel,
    );
    const updated = await this.updateStatusByHealthLevel(
      found.id,
      updateAssetHealthLevelDto.healthLevel,
      correlationId,
    );

    await this.kafkaProducer.send({
      topic: TopicsEnum.AssetHealthLevelUpdated,
      messages: [
        {
          key: TopicsEnum.AssetHealthLevelUpdated,
          value: JSON.stringify(updated.present()),
        },
      ],
    });

    return updated;
  }
}
