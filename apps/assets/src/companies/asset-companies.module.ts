import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AssetCompany,
  AssetCompanySchema,
} from './entities/asset-company.entity';
import { AssetCompaniesService } from './asset-companies.service';
import { AssetCompaniesMongooseRepository } from './asset-company.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AssetCompany.name,
        schema: AssetCompanySchema,
      },
    ]),
  ],
  providers: [AssetCompaniesService, AssetCompaniesMongooseRepository],
  exports: [AssetCompaniesService],
})
export class AssetCompaniesModule {}
