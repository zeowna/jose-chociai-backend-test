import { Injectable } from '@nestjs/common';
import { AssetsService } from '../assets/assets.service';
import { AssetCompaniesService } from '../companies/asset-companies.service';
import {
  PlainCompanyInterface,
  PlainUnitInterface,
} from '@zeowna/entities-definition';
import { AssetUnitsService } from '../units/asset-units.service';
import { KafkaContext } from '@nestjs/microservices';

@Injectable()
export class AssetsConsumersService {
  constructor(
    private readonly assetsService: AssetsService,
    private readonly companiesService: AssetCompaniesService,
    private readonly unitService: AssetUnitsService,
  ) {}

  async companyCreatedConsumer(
    company: PlainCompanyInterface,
    context: KafkaContext,
  ) {
    console.log(context.getTopic(), company);
    await this.companiesService.createOrUpdate(company);
  }

  async companyUpdateConsumer(
    company: PlainCompanyInterface,
    context: KafkaContext,
  ) {
    console.log(context.getTopic(), company);
    await this.companiesService.createOrUpdate(company);
    await this.assetsService.updateAssetCompany(company);
  }

  async unitCreatedConsumer(unit: PlainUnitInterface, context: KafkaContext) {
    console.log(context.getTopic(), unit);
    await this.unitService.createOrUpdate({
      ...unit,
      companyId: unit.company.id as string,
    });
  }

  async unitUpdatedConsumer(unit: PlainUnitInterface, context: KafkaContext) {
    console.log(context.getTopic(), unit);
    await this.unitService.createOrUpdate({
      ...unit,
      companyId: unit.company.id as string,
    });
    await this.assetsService.updateAssetUnit(unit);
  }
}
