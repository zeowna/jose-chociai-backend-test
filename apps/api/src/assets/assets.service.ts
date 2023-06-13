import { Injectable, NotFoundException } from '@nestjs/common';
import { AbstractService, SortParams } from '@zeowna/common';
import { Asset } from './entities/asset.entity';
import { AssetsMongooseRepository } from './assets-mongoose.repository';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@Injectable()
export class AssetsService extends AbstractService<
  Asset,
  CreateAssetDto,
  UpdateAssetDto
> {
  constructor(private readonly repository: AssetsMongooseRepository) {
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
    return super.create({
      ...createAssetDto,
      owner: { _id: createAssetDto.ownerId },
      unit: { _id: createAssetDto.unitId },
    });
  }
}
