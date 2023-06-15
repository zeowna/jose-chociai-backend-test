import { Module } from '@nestjs/common';
import { CompanyUnitsService } from './company-units.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyUnit, CompanyUnitSchema } from './entities/company-unit.entity';
import { CompanyUnitsMongooseRepository } from './company-units-mongoose.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CompanyUnit.name, schema: CompanyUnitSchema },
    ]),
  ],
  providers: [CompanyUnitsService, CompanyUnitsMongooseRepository],
  exports: [CompanyUnitsService],
})
export class CompanyUnitsModule {}
