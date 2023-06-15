import { Injectable } from '@nestjs/common';
import { UserCompany } from './entities/user-company.entity';
import { AbstractService } from '@zeowna/common';
import { UserCompaniesMongooseRepository } from './user-companies-mongoose.repository';

@Injectable()
export class UserCompaniesService extends AbstractService<UserCompany> {
  constructor(
    private readonly companiesRepository: UserCompaniesMongooseRepository,
  ) {
    super(companiesRepository);
  }

  async findById(id: any) {
    return this.companiesRepository.findById(id);
  }
}
