import { Injectable } from '@nestjs/common';
import { PlainUnitInterface } from '@zeowna/entities-definition';
import { CompanyUnitsService } from '../units/company-units.service';
import { KafkaContext } from '@nestjs/microservices';
import { CompaniesService } from '../companies/companies.service';
import {
  CompanyUnit,
  CompanyUnitDocument,
} from '../units/entities/company-unit.entity';
import { NestLoggerService } from '@zeowna/logger';

@Injectable()
export class CompaniesConsumerService {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly unitsService: CompanyUnitsService,
    private readonly logger: NestLoggerService,
  ) {}

  async unitCreatedConsumer(unit: PlainUnitInterface, context: KafkaContext) {
    const topic = context.getTopic();
    const {
      headers: { correlationId },
    } = context.getMessage();

    try {
      this.logger.log(topic, { correlationId, unit });
      await this.unitsService.createOrUpdate(
        new CompanyUnit(unit as unknown as CompanyUnitDocument),
        correlationId as string,
      );
      await this.companiesService.updateCompanyUnits(
        unit,
        correlationId as string,
      );
      this.logger.log(topic, { correlationId, unit });
    } catch (err) {
      this.logger.error(topic, { correlationId, unit, err });
    }
  }

  async unitUpdatedConsumer(unit: PlainUnitInterface, context: KafkaContext) {
    await this.unitCreatedConsumer(unit, context);
  }
}
