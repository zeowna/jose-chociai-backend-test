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
  ) {
    super(repository);
  }

  async findAllByOwnerId(
    ownerId: string,
    skip = 0,
    limit = 10,
    sort: SortParams = { createdAt: -1 },
  ) {
    return this.repository.findAllByOwnerId(ownerId, skip, limit, sort);
  }

  async findByIdAndOwnerId(id: string, ownerId: string) {
    const found = await this.repository.findByIdAndOwnerId(id, ownerId);

    if (!found) {
      throw new NotFoundException(
        `${this.repository.entityName} not found with id: ${id}`,
      );
    }

    return found;
  }

  async create(createAssetDto: CreateAssetDto) {
    const owner = await this.companyService.findById(createAssetDto.ownerId);
    const unit = await this.unitService.findById(createAssetDto.unitId);

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

    return super.create(createAssetDto);
  }

  async updateAssetCompany(company: PlainCompany) {
    await this.repository.updateAssetCompany(
      new AssetCompany(company as unknown as AssetCompanyDocument),
    );
  }

  async updateAssetUnit(unit: PlainUnitInterface) {
    await this.repository.updateAssetUnit(
      new AssetUnit({
        ...unit,
        companyId: unit.company.id,
      } as unknown as AssetUnitDocument),
    );
  }

  private async updateStatus(id: ID, status: AssetStatusEnum) {
    const found = await this.findById(id);

    return this.repository.updateStatus(found.id, status);
  }

  private updateStatusByHealthLevel(id: ID, healthLevel: number) {
    const isAlerting = healthLevel >= 0.75 && healthLevel <= 0.95;
    const isStopped = healthLevel < 0.75;

    if (isAlerting) {
      return this.updateStatus(id, AssetStatusEnum.Alerting);
    }

    if (isStopped) {
      return this.updateStatus(id, AssetStatusEnum.Stopped);
    }

    return this.updateStatus(id, AssetStatusEnum.Running);
  }

  async updateHealthLevel(
    id: string,
    ownerId: string,
    updateAssetHealthLevelDto: UpdateAssetHealthLevelDto,
  ) {
    const found = await this.findByIdAndOwnerId(id, ownerId);
    await this.repository.updateHealthLevel(
      found.id as string,
      updateAssetHealthLevelDto.healthLevel,
    );
    const updated = await this.updateStatusByHealthLevel(
      found.id,
      updateAssetHealthLevelDto.healthLevel,
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
