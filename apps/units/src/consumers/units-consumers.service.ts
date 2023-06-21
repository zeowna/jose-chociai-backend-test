import { Injectable } from '@nestjs/common';
import { PlainCompany } from '@zeowna/entities-definition';
import { UnitsService } from '../units/units.service';
import { UnitCompaniesService } from '../companies/unit-companies.service';
import { KafkaContext } from '@nestjs/microservices';
import {
  UnitCompany,
  UnitCompanyDocument,
} from '../companies/entities/unit-company.entity';
import { NestLoggerService } from '@zeowna/logger';

@Injectable()
export class UnitsConsumersService {
  constructor(
    private readonly companiesService: UnitCompaniesService,
    private readonly unitsService: UnitsService,
    private readonly logger: NestLoggerService,
  ) {}

  async companyCreatedConsumer(company: PlainCompany, context: KafkaContext) {
    const topic = context.getTopic();
    const {
      headers: { correlationId },
    } = context.getMessage();

    this.logger.log(topic, { correlationId, company });
    try {
      await this.companiesService.createOrUpdate(
        new UnitCompany(company as unknown as UnitCompanyDocument),
        correlationId as string,
      );
    } catch (err) {
      this.logger.error(topic, { correlationId, company, err });
    }
  }

  async companyUpdatedConsumer(company: PlainCompany, context: KafkaContext) {
    const topic = context.getTopic();
    const {
      headers: { correlationId },
    } = context.getMessage();

    try {
      await this.companyCreatedConsumer(company, context);
      await this.unitsService.updateUnitCompany(
        company,
        correlationId as string,
      );
    } catch (err) {
      this.logger.error(topic, { correlationId, company, err });
    }
  }
}
