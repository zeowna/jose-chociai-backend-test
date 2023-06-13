import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './entities/company.entity';
import { CompaniesService } from './companies.service';
import { CompaniesMongooseRepository } from './companies-mongoose-repository';
import { CompaniesController } from './companies.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService, CompaniesMongooseRepository],
})
export class CompaniesModule {}
