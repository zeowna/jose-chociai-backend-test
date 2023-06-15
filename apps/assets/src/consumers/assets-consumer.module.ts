import { Module } from '@nestjs/common';
import { AssetsModule } from '../assets/assets.module';
import { AssetUnitsModule } from '../units/asset-units.module';
import { AssetCompaniesModule } from '../companies/asset-companies.module';
import { AssetsConsumerController } from './assets-consumer.controller';
import { AssetsConsumersService } from './assets-consumers.service';

@Module({
  imports: [AssetsModule, AssetCompaniesModule, AssetUnitsModule],
  controllers: [AssetsConsumerController],
  providers: [AssetsConsumersService],
})
export class AssetsConsumerModule {}
