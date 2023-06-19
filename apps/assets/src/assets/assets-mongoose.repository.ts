import { Injectable } from '@nestjs/common';
import { AbstractMongooseRepository } from '@zeowna/mongoose';
import { Asset, AssetDocument } from './entities/asset.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AssetCompany } from '../companies/entities/asset-company.entity';
import { AssetUnit } from '../units/entities/asset-unit.entity';
import { ID, SortParams } from '@zeowna/common';
import { AssetStatusEnum } from './entities/asset-status.enum';

@Injectable()
export class AssetsMongooseRepository extends AbstractMongooseRepository<Asset> {
  constructor(
    @InjectModel(Asset.name) private readonly repository: Model<Asset>,
  ) {
    super(repository, Asset);
  }

  async findAllByOwnerId(
    ownerId: string,
    skip: number,
    limit: number,
    sort: SortParams,
  ) {
    const foundList = await this.repository
      .find({ 'owner._id': ownerId })
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .lean()
      .exec();

    return foundList.map((found) => new Asset(found as AssetDocument));
  }

  async findByIdAndOwnerId(id: any, ownerId: any) {
    const found = await this.repository
      .findOne({ _id: id, 'owner._id': ownerId })
      .lean()
      .exec();

    if (!found) {
      return null;
    }

    return new Asset(found as AssetDocument);
  }

  async updateStatus(id: ID, status: AssetStatusEnum) {
    const updated = await this.repository
      .findByIdAndUpdate(id, { $set: { status } }, { new: true })
      .lean()
      .exec();

    if (!updated) {
      return null;
    }

    return new Asset(updated as AssetDocument);
  }

  async updateHealthLevel(id: string, healthLevel: number) {
    const updated = await this.repository
      .findByIdAndUpdate(id, { $set: { healthLevel } }, { new: true })
      .lean()
      .exec();

    if (!updated) {
      return null;
    }

    return new Asset(updated as AssetDocument);
  }

  async updateAssetCompany(company: AssetCompany) {
    await this.repository
      .updateMany({ 'company._id': company._id }, { $set: { owner: company } })
      .lean()
      .exec();
  }

  async updateAssetUnit(unit: AssetUnit) {
    await this.repository
      .updateMany({ 'unit._id': unit._id }, { $set: { unit } })
      .lean()
      .exec();
  }
}
