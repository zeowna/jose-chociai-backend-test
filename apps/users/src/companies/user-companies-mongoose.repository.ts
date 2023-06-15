import { Injectable } from '@nestjs/common';
import { AbstractMongooseRepository } from '@zeowna/mongoose';
import { UserCompany } from './entities/user-company.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from '../../../companies/src/companies/entities/company.entity';

@Injectable()
export class UserCompaniesMongooseRepository extends AbstractMongooseRepository<UserCompany> {
  constructor(
    @InjectModel(UserCompany.name)
    private readonly repository: Model<UserCompany>,
  ) {
    super(repository, Company);
  }
}
