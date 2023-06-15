import { Injectable } from '@nestjs/common';
import { AbstractMongooseRepository } from '@zeowna/mongoose';
import { Company, CompanyDocument } from './entities/company.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlainUnitInterface } from '@zeowna/entities-definition';

@Injectable()
export class CompaniesMongooseRepository extends AbstractMongooseRepository<Company> {
  constructor(
    @InjectModel(Company.name) private readonly repository: Model<Company>,
  ) {
    super(repository, Company);
  }

  async updateCompanyUnit(unit: PlainUnitInterface) {
    await this.repository.updateOne(
      { _id: unit.company.id },
      { $addToSet: { units: unit } },
    );
  }

  async findByCnpj(cnpj: string) {
    const found = await this.repository.findOne({ cnpj }).lean().exec();

    if (!found) {
      return null;
    }

    return new Company(found as CompanyDocument);
  }
}
