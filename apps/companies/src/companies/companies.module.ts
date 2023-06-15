import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './entities/company.entity';
import { CompaniesService } from './companies.service';
import { CompaniesMongooseRepository } from './companies-mongoose-repository';
import { CompaniesController } from './companies.controller';
import { ZeownaKafkaModule } from '@zeowna/kafka';
import { IsCompanyCnpjAlreadyInUse } from './dto/is-company-cnpj-already-in-use.validation';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
    ZeownaKafkaModule.register(
      { brokers: ['kafka:9092'] },
      {
        groupId: 'companies',
      },
    ),
  ],
  controllers: [CompaniesController],
  providers: [
    CompaniesService,
    CompaniesMongooseRepository,
    IsCompanyCnpjAlreadyInUse,
  ],
  exports: [CompaniesService],
})
export class CompaniesModule {}
