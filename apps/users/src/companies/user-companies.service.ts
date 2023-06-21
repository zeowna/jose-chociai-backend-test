import { Injectable } from '@nestjs/common';
import { UserCompany } from './entities/user-company.entity';
import { AbstractService } from '@zeowna/common';
import { UserCompaniesMongooseRepository } from './user-companies-mongoose.repository';
import { NestLoggerService } from '@zeowna/logger';

@Injectable()
export class UserCompaniesService extends AbstractService<UserCompany> {
  constructor(
    private readonly companiesRepository: UserCompaniesMongooseRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(companiesRepository, logger);
  }

  async findById(id: any) {
    return this.companiesRepository.findById(id);
  }
}
