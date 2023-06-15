import { Module } from '@nestjs/common';
import { CompaniesConsumerService } from './companies-consumer.service';
import { CompanyUnitsModule } from '../units/company-units.module';
import { CompaniesModule } from '../companies/companies.module';
import { CompaniesConsumerController } from './companies-consumer.controller';

@Module({
  imports: [CompaniesModule, CompanyUnitsModule],
  controllers: [CompaniesConsumerController],
  providers: [CompaniesConsumerService],
})
export class CompaniesConsumerModule {}
