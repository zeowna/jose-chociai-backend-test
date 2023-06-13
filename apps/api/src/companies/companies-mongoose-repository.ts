import { Injectable } from '@nestjs/common';
import { AbstractMongooseRepository } from '@zeowna/common';
import { Company } from './entities/company.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CompaniesMongooseRepository extends AbstractMongooseRepository<Company> {
  constructor(@InjectModel(Company.name) repository: Model<Company>) {
    super(repository);
  }
}
