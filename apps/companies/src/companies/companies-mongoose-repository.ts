import { Injectable } from '@nestjs/common';
import { AbstractMongooseRepository } from '@zeowna/mongoose';
import { Company, CompanyDocument } from './entities/company.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyUnit } from '../units/entities/company-unit.entity';
import { ID } from '@zeowna/common';

@Injectable()
export class CompaniesMongooseRepository extends AbstractMongooseRepository<Company> {
  constructor(
    @InjectModel(Company.name) private readonly repository: Model<Company>,
  ) {
    super(repository, Company);
  }

  async updateCompanyUnits(id: ID, units: CompanyUnit[]) {
    await this.repository
      .updateOne({ _id: id }, { $set: { units } })
      .lean()
      .exec();
  }

  async findByCnpj(cnpj: string) {
    const found = await this.repository.findOne({ cnpj }).lean().exec();

    if (!found) {
      return null;
    }

    return new Company(found as CompanyDocument);
  }
}
