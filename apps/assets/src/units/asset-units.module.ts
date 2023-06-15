import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssetUnit, AssetUnitSchema } from './entities/asset-unit.entity';
import { AssetUnitsService } from './asset-units.service';
import { AssetUnitsMongooseRepository } from './asset-units.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AssetUnit.name,
        schema: AssetUnitSchema,
      },
    ]),
  ],
  providers: [AssetUnitsService, AssetUnitsMongooseRepository],
  exports: [AssetUnitsService],
})
export class AssetUnitsModule {}
