import { Injectable } from '@nestjs/common';
import { PlainUnitInterface } from '@zeowna/entities-definition';
import { CompanyUnitsService } from '../units/company-units.service';
import { KafkaContext } from '@nestjs/microservices';
import { CompaniesService } from '../companies/companies.service';

@Injectable()
export class CompaniesConsumerService {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly unitsService: CompanyUnitsService,
  ) {}

  async unitCreatedConsumer(unit: PlainUnitInterface, context: KafkaContext) {
    console.log(context.getTopic(), unit);
    await this.companiesService.updateCompanyUnit(unit);
    await this.unitsService.createOrUpdate(unit);
  }

  async unitUpdatedConsumer(unit: PlainUnitInterface, context: KafkaContext) {
    await this.unitCreatedConsumer(unit, context);
  }
}
