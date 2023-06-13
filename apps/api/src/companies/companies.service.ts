import { Injectable } from '@nestjs/common';
import { AbstractService } from '@zeowna/common';
import { CompaniesMongooseRepository } from './companies-mongoose-repository';

@Injectable()
export class CompaniesService extends AbstractService {
  constructor(
    private readonly companiesRepository: CompaniesMongooseRepository,
  ) {
    super(companiesRepository);
  }
}
