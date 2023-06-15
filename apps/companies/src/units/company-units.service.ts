import { Injectable } from '@nestjs/common';
import { AbstractService } from '@zeowna/common';
import { CompanyUnit } from './entities/company-unit.entity';
import { CompanyUnitsMongooseRepository } from './company-units-mongoose.repository';

@Injectable()
export class CompanyUnitsService extends AbstractService<CompanyUnit> {
  constructor(
    private readonly unitsRepository: CompanyUnitsMongooseRepository,
  ) {
    super(unitsRepository);
  }
}
