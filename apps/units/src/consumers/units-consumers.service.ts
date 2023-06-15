import { Injectable } from '@nestjs/common';
import { PlainCompanyInterface } from '@zeowna/entities-definition';
import { UnitsService } from '../units/units.service';
import { UnitCompaniesService } from '../companies/unit-companies.service';
import { KafkaContext } from '@nestjs/microservices';

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
    await this.companiesService.createOrUpdate(company);
  }

  async companyUpdatedConsumer(
    company: PlainCompanyInterface,
    context: KafkaContext,
  ) {
    console.log(context.getTopic(), company);
    await this.unitsService.updateUnitCompany(company);
    await this.companiesService.createOrUpdate(company);
  }
}
