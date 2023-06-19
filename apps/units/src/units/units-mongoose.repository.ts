import { Injectable } from '@nestjs/common';
import { AbstractMongooseRepository } from '@zeowna/mongoose';
import { Unit, UnitDocument } from './entities/unit.entity';
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

  async findByIdAndCompanyId(id: string, companyId: string) {
    const found = await this.repository
      .findOne({ _id: id, 'company._id': companyId })
      .lean()
      .exec();

    if (!found) {
      return null;
    }

    return new Unit(found as UnitDocument);
  }
}
