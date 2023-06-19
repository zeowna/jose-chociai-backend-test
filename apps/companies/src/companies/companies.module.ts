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
      { brokers: process.env.KAFKA_BROKERS.split(',') },
      { groupId: process.env.KAFKA_CONSUMER_GROUP_ID },
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
