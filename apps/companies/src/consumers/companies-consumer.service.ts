import { Injectable, Logger } from '@nestjs/common';
import { PlainUnitInterface } from '@zeowna/entities-definition';
import { CompanyUnitsService } from '../units/company-units.service';
import { KafkaContext } from '@nestjs/microservices';
import { CompaniesService } from '../companies/companies.service';
import {
  CompanyUnit,
  CompanyUnitDocument,
} from '../units/entities/company-unit.entity';

@Injectable()
export class CompaniesConsumerService {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly unitsService: CompanyUnitsService,
  ) {}

  async unitCreatedConsumer(unit: PlainUnitInterface, context: KafkaContext) {
    console.log(context.getTopic(), unit);
    try {
      await this.unitsService.createOrUpdate(
        new CompanyUnit(unit as unknown as CompanyUnitDocument),
      );
    } catch (err) {
      Logger.error(err);
    }
  }

  async unitUpdatedConsumer(unit: PlainUnitInterface, context: KafkaContext) {
    try {
      await this.unitCreatedConsumer(unit, context);
      await this.companiesService.updateCompanyUnit(unit);
    } catch (err) {
      Logger.error(err);
    }
  }
}
