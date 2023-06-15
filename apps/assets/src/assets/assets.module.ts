import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Asset, AssetSchema } from './entities/asset.entity';
import { AssetsController } from './assets.controller';
import { AssetsService } from './assets.service';
import { AssetsMongooseRepository } from './assets-mongoose.repository';
import { ZeownaKafkaModule } from '@zeowna/kafka';
import { AssetCompaniesModule } from '../companies/asset-companies.module';
import { AssetUnitsModule } from '../units/asset-units.module';

@Module({
  imports: [
    ZeownaKafkaModule.register(
      { brokers: ['kafka:9092'] },
      { groupId: 'assets' },
    ),
    MongooseModule.forFeature([{ name: Asset.name, schema: AssetSchema }]),
    AssetCompaniesModule,
    AssetUnitsModule,
  ],
  controllers: [AssetsController],
  providers: [AssetsService, AssetsMongooseRepository],
  exports: [AssetsService],
})
export class AssetsModule {}
