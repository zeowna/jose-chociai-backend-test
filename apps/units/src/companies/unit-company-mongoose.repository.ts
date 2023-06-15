import { Injectable } from '@nestjs/common';
import { AbstractMongooseRepository } from '@zeowna/mongoose';
import { UnitCompany } from './entities/unit-company.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UnitCompaniesMongooseRepository extends AbstractMongooseRepository<UnitCompany> {
  constructor(
    @InjectModel(UnitCompany.name)
    private readonly repository: Model<UnitCompany>,
  ) {
    super(repository, UnitCompany);
  }
}
