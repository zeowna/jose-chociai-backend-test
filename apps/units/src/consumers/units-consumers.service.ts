import { Injectable, Logger } from '@nestjs/common';
import { PlainCompanyInterface } from '@zeowna/entities-definition';
import { UnitsService } from '../units/units.service';
import { UnitCompaniesService } from '../companies/unit-companies.service';
import { KafkaContext } from '@nestjs/microservices';
import {
  UnitCompany,
  UnitCompanyDocument,
} from '../companies/entities/unit-company.entity';

@Injectable()
export class UnitsConsumersService {
  constructor(
    private readonly companiesService: UnitCompaniesService,
    private readonly unitsService: UnitsService,
  ) {}

  async companyCreatedConsumer(
    company: PlainCompanyInterface,
    context: KafkaContext,
  ) {
    console.log(context.getTopic(), company);
    try {
      await this.companiesService.createOrUpdate(
        new UnitCompany(company as unknown as UnitCompanyDocument),
      );
    } catch (err) {
      Logger.error(err);
    }
  }

  async companyUpdatedConsumer(
    company: PlainCompanyInterface,
    context: KafkaContext,
  ) {
    try {
      await this.companyCreatedConsumer(company, context);
      await this.unitsService.updateUnitCompany(company);
    } catch (err) {
      Logger.error(err);
    }
  }
}
