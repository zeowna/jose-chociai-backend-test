import { Injectable } from '@nestjs/common';
import { AbstractMongooseRepository } from '@zeowna/mongoose';
import { CompanyUnit } from './entities/company-unit.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from '../companies/entities/company.entity';

@Injectable()
export class CompanyUnitsMongooseRepository extends AbstractMongooseRepository<CompanyUnit> {
  constructor(
    @InjectModel(CompanyUnit.name)
    private readonly repository: Model<CompanyUnit>,
  ) {
    super(repository, Company);
  }
}
