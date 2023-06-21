import { Injectable } from '@nestjs/common';
import { AbstractService } from '@zeowna/common';
import { UnitCompany } from './entities/unit-company.entity';
import { UnitCompaniesMongooseRepository } from './unit-company-mongoose.repository';
import { NestLoggerService } from '@zeowna/logger';

@Injectable()
export class UnitCompaniesService extends AbstractService<UnitCompany> {
  constructor(
    private readonly companiesRepository: UnitCompaniesMongooseRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(companiesRepository, logger);
  }

  /**
   * Avoiding NotFoundException
   */
  async findById(id: string) {
    return this.companiesRepository.findById(id);
  }
}
