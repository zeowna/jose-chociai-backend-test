import { Injectable } from '@nestjs/common';
import { AbstractService } from '@zeowna/common';
import { AssetUnit } from './entities/asset-unit.entity';
import { AssetUnitsMongooseRepository } from './asset-units.repository';

@Injectable()
export class AssetUnitsService extends AbstractService<AssetUnit> {
  constructor(
    private readonly assetUnitRepository: AssetUnitsMongooseRepository,
  ) {
    super(assetUnitRepository);
  }
}
