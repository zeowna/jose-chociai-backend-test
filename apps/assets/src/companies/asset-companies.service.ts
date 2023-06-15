import { Injectable } from '@nestjs/common';
import { AbstractService } from '@zeowna/common';
import { AssetCompany } from './entities/asset-company.entity';
import { AssetCompaniesMongooseRepository } from './asset-company.repository';

@Injectable()
export class AssetCompaniesService extends AbstractService<AssetCompany> {
  constructor(
    private readonly assetCompanyRepository: AssetCompaniesMongooseRepository,
  ) {
    super(assetCompanyRepository);
  }
}
