import { Injectable } from '@nestjs/common';
import { AbstractMongooseRepository } from '@zeowna/mongoose';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AssetUnit } from './entities/asset-unit.entity';

@Injectable()
export class AssetUnitsMongooseRepository extends AbstractMongooseRepository<AssetUnit> {
  constructor(
    @InjectModel(AssetUnit.name)
    private readonly repository: Model<AssetUnit>,
  ) {
    super(repository, AssetUnit);
  }
}
