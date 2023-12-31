import { Injectable } from '@nestjs/common';
import { AbstractService } from '@zeowna/common';
import { CompanyUnit } from './entities/company-unit.entity';
import { CompanyUnitsMongooseRepository } from './company-units-mongoose.repository';
import { NestLoggerService } from '@zeowna/logger';

@Injectable()
export class CompanyUnitsService extends AbstractService<CompanyUnit> {
  constructor(
    private readonly unitsRepository: CompanyUnitsMongooseRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(unitsRepository, logger);
  }
}
