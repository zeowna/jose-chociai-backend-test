import { Injectable } from '@nestjs/common';
import { AbstractMongooseRepository } from '@zeowna/mongoose';
import { AssetCompany } from './entities/asset-company.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AssetCompaniesMongooseRepository extends AbstractMongooseRepository<AssetCompany> {
  constructor(
    @InjectModel(AssetCompany.name)
    private readonly repository: Model<AssetCompany>,
  ) {
    super(repository, AssetCompany);
  }

  async createOrUpdate(company: AssetCompany) {
    const updated = await this.update(company.id, company);

    if (updated) {
      return updated;
    }

    return this.create(company);
  }
}
