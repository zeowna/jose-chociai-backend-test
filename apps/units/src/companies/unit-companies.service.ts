import { Injectable } from '@nestjs/common';
import { AbstractService } from '@zeowna/common';
import { UnitCompany } from './entities/unit-company.entity';
import { UnitCompaniesMongooseRepository } from './unit-company-mongoose.repository';

@Injectable()
export class UnitCompaniesService extends AbstractService<UnitCompany> {
  constructor(
    private readonly companiesRepository: UnitCompaniesMongooseRepository,
  ) {
    super(companiesRepository);
  }

  /**
   * Avoiding NotFoundException
   */
  async findById(id: string) {
    return this.companiesRepository.findById(id);
  }
}
