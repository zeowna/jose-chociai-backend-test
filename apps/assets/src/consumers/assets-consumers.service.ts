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

    try {
      this.logger.log(topic, company, 'started');
      await this.companiesService.createOrUpdate(
        new AssetCompany(company as unknown as AssetCompanyDocument),
      );
      this.logger.log(topic, company, 'completed');
    } catch (err) {
      this.logger.error(topic, company, err, 'error');
    }
  }

  async companyUpdateConsumer(company: PlainCompany, context: KafkaContext) {
    const topic = context.getTopic();

    try {
      await this.companyCreatedConsumer(company, context);
      await this.assetsService.updateAssetCompany(company);
    } catch (err) {
      this.logger.error(topic, company, err, 'error');
    }
  }

  async unitCreatedConsumer(unit: PlainUnitInterface, context: KafkaContext) {
    const topic = context.getTopic();

    try {
      this.logger.log(topic, unit, 'started');

      await this.unitService.createOrUpdate(
        new AssetUnit({
          ...unit,
          companyId: unit.company.id as string,
        } as unknown as AssetUnitDocument),
      );
      this.logger.log(topic, unit, 'completed');
    } catch (err) {
      this.logger.error(topic, unit, err, 'error');
    }
  }

  async unitUpdatedConsumer(unit: PlainUnitInterface, context: KafkaContext) {
    const topic = context.getTopic();

    try {
      await this.unitCreatedConsumer(unit, context);
      await this.assetsService.updateAssetUnit(unit);
    } catch (err) {
      this.logger.error(topic, unit, err, 'error');
    }
  }
}
