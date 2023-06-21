import { Injectable } from '@nestjs/common';
import { AssetsService } from '../assets/assets.service';
import { AssetCompaniesService } from '../companies/asset-companies.service';
import { PlainCompany, PlainUnitInterface } from '@zeowna/entities-definition';
import { AssetUnitsService } from '../units/asset-units.service';
import { KafkaContext } from '@nestjs/microservices';
import {
  AssetCompany,
  AssetCompanyDocument,
} from '../companies/entities/asset-company.entity';
import {
  AssetUnit,
  AssetUnitDocument,
} from '../units/entities/asset-unit.entity';
import { NestLoggerService } from '@zeowna/logger';

@Injectable()
export class AssetsConsumersService {
  constructor(
    private readonly assetsService: AssetsService,
    private readonly companiesService: AssetCompaniesService,
    private readonly unitService: AssetUnitsService,
    private readonly logger: NestLoggerService,
  ) {}

  async companyCreatedConsumer(company: PlainCompany, context: KafkaContext) {
    const topic = context.getTopic();
    const {
      headers: { correlationId },
    } = context.getMessage();

    try {
      this.logger.log(topic, { correlationId, company });
      await this.companiesService.createOrUpdate(
        new AssetCompany(company as unknown as AssetCompanyDocument),
        correlationId as string,
      );
      this.logger.log(topic, { correlationId, company });
    } catch (err) {
      this.logger.error(topic, { correlationId, company, err });
    }
  }

  async companyUpdateConsumer(company: PlainCompany, context: KafkaContext) {
    const topic = context.getTopic();
    const {
      headers: { correlationId },
    } = context.getMessage();

    try {
      await this.companyCreatedConsumer(company, context);
      await this.assetsService.updateAssetCompany(
        company,
        correlationId as string,
      );
    } catch (err) {
      this.logger.error(topic, company, err, 'error');
    }
  }

  async unitCreatedConsumer(unit: PlainUnitInterface, context: KafkaContext) {
    const topic = context.getTopic();
    const {
      headers: { correlationId },
    } = context.getMessage();

    try {
      this.logger.log(topic, { correlationId, unit });

      await this.unitService.createOrUpdate(
        new AssetUnit({
          ...unit,
          companyId: unit.company.id as string,
        } as unknown as AssetUnitDocument),
        correlationId as string,
      );
      this.logger.log(topic, { correlationId, unit });
    } catch (err) {
      this.logger.error(topic, { correlationId, unit, err });
    }
  }

  async unitUpdatedConsumer(unit: PlainUnitInterface, context: KafkaContext) {
    const topic = context.getTopic();
    const {
      headers: { correlationId },
    } = context.getMessage();

    try {
      await this.unitCreatedConsumer(unit, context);
      await this.assetsService.updateAssetUnit(unit, correlationId as string);
    } catch (err) {
      this.logger.error(topic, { correlationId, unit, err });
    }
  }
}
