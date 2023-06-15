import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AbstractService, SortParams } from '@zeowna/common';
import { Asset } from './entities/asset.entity';
import { AssetsMongooseRepository } from './assets-mongoose.repository';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import {
  PlainCompanyInterface,
  PlainUnitInterface,
} from '@zeowna/entities-definition';
import { AssetCompaniesService } from '../companies/asset-companies.service';
import { AssetUnitsService } from '../units/asset-units.service';
import { UpdateAssetHealthLevelDto } from './dto/update-asset-health-level.dto';
import { KafkaProducer, TopicsEnum } from '@zeowna/kafka';

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

    return super.create({
      ...createAssetDto,
      owner: owner ? owner : { _id: createAssetDto.ownerId },
      unit: unit ? unit : { _id: createAssetDto.unitId },
    });
  }

  async updateAssetCompany(company: PlainCompanyInterface) {
    await this.repository.updateAssetCompany(company);
  }

  async updateAssetUnit(unit: PlainUnitInterface) {
    await this.repository.updateAssetUnit({
      ...unit,
      companyId: unit.company.id as string,
    });
  }

  async updateHealthLevel(
    id: string,
    ownerId: string,
    updateAssetHealthLevelDto: UpdateAssetHealthLevelDto,
  ) {
    const found = await this.findByIdAndOwnerId(id, ownerId);
    const updated = await this.repository.updateHealthLevel(
      found.id as string,
      updateAssetHealthLevelDto.healthLevel,
    );

    await this.kafkaProducer.send({
      topic: TopicsEnum.AssetHealthLevelUpdated,
      messages: [
        {
          key: TopicsEnum.AssetHealthLevelUpdated,
          value: JSON.stringify(updated),
        },
      ],
    });

    return updated;
  }
}
