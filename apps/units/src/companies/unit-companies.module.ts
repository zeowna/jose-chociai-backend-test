import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UnitCompany, UnitCompanySchema } from './entities/unit-company.entity';
import { UnitCompaniesService } from './unit-companies.service';
import { UnitCompaniesMongooseRepository } from './unit-company-mongoose.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UnitCompany.name, schema: UnitCompanySchema },
    ]),
  ],
  providers: [UnitCompaniesService, UnitCompaniesMongooseRepository],
  exports: [UnitCompaniesService],
})
export class UnitCompaniesModule {}
