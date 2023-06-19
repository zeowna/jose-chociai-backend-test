import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserCompaniesService } from '../companies/user-companies.service';
import { KafkaContext } from '@nestjs/microservices';
import { PlainCompanyInterface } from '@zeowna/entities-definition';
import {
  UserCompany,
  UserCompanyDocument,
} from '../companies/entities/user-company.entity';

@Injectable()
export class UsersConsumersService {
  constructor(
    private readonly usersService: UsersService,
    private readonly companiesService: UserCompaniesService,
  ) {}

  async companyCreatedConsumer(
    company: PlainCompanyInterface,
    context: KafkaContext,
  ) {
    console.log(context.getTopic(), company);
    await this.companiesService.createOrUpdate(
      new UserCompany(company as unknown as UserCompanyDocument),
    );
  }

  async companyUpdatedConsumer(
    company: PlainCompanyInterface,
    context: KafkaContext,
  ) {
    await this.companyCreatedConsumer(company, context);
    await this.usersService.updateUserCompany(company);
  }
}
