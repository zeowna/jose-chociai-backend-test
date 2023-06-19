import { Injectable } from '@nestjs/common';
import { AssetsService } from '../assets/assets.service';
import { AssetCompaniesService } from '../companies/asset-companies.service';
import {
  PlainCompanyInterface,
  PlainUnitInterface,
} from '@zeowna/entities-definition';
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
    await this.companiesService.createOrUpdate(
      new AssetCompany(company as unknown as AssetCompanyDocument),
    );
  }

  async companyUpdateConsumer(
    company: PlainCompanyInterface,
    context: KafkaContext,
  ) {
    await this.companyCreatedConsumer(company, context);
    await this.assetsService.updateAssetCompany(company);
  }

  async unitCreatedConsumer(unit: PlainUnitInterface, context: KafkaContext) {
    console.log(context.getTopic(), unit);
    await this.unitService.createOrUpdate(
      new AssetUnit({
        ...unit,
        companyId: unit.company.id as string,
      } as unknown as AssetUnitDocument),
    );
  }

  async unitUpdatedConsumer(unit: PlainUnitInterface, context: KafkaContext) {
    console.log(context.getTopic(), unit);
    await this.unitCreatedConsumer(unit, context);
    await this.assetsService.updateAssetUnit(unit);
  }
}
