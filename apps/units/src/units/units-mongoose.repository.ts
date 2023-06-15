import { Injectable } from '@nestjs/common';
import { AbstractMongooseRepository } from '@zeowna/mongoose';
import { Unit } from './entities/unit.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlainCompanyInterface } from '@zeowna/entities-definition';

@Injectable()
export class UnitsMongooseRepository extends AbstractMongooseRepository<Unit> {
  constructor(
    @InjectModel(Unit.name) private readonly repository: Model<Unit>,
  ) {
    super(repository, Unit);
  }

  async updateUnitCompany(company: PlainCompanyInterface) {
    await this.repository
      .updateMany({ 'company._id': company.id }, { company: company })
      .lean()
      .exec();
  }
}
