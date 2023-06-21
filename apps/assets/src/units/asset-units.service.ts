import { Injectable } from '@nestjs/common';
import { AbstractService } from '@zeowna/common';
import { AssetUnit } from './entities/asset-unit.entity';
import { AssetUnitsMongooseRepository } from './asset-units.repository';
import { NestLoggerService } from '@zeowna/logger';

@Injectable()
export class AssetUnitsService extends AbstractService<AssetUnit> {
  constructor(
    private readonly assetUnitRepository: AssetUnitsMongooseRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(assetUnitRepository, logger);
  }
}
