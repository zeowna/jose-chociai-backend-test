import { Injectable } from '@nestjs/common';
import { AbstractMongooseRepository, SortParams } from '@zeowna/common';
import { Asset } from './entities/asset.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AssetsMongooseRepository extends AbstractMongooseRepository<Asset> {
  constructor(
    @InjectModel(Asset.name) private readonly repository: Model<Asset>,
  ) {
    super(repository);
  }

  async findAllByOwnerId(
    ownerId: string,
    skip: number,
    limit: number,
    sort: SortParams,
  ) {
    return this.repository
      .find({ 'owner._id': ownerId })
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .exec();
  }

  async findByIdAndOwnerId(id: any, ownerId: any) {
    return this.repository.findOne({ _id: id, 'owner.id': ownerId }).exec();
  }
}
