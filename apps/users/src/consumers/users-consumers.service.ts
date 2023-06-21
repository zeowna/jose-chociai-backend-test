import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserCompaniesService } from '../companies/user-companies.service';
import { KafkaContext } from '@nestjs/microservices';
import { PlainCompany } from '@zeowna/entities-definition';
import {
  UserCompany,
  UserCompanyDocument,
} from '../companies/entities/user-company.entity';
import { NestLoggerService } from '@zeowna/logger';

@Injectable()
export class UsersConsumersService {
  constructor(
    private readonly usersService: UsersService,
    private readonly companiesService: UserCompaniesService,
    private readonly logger: NestLoggerService,
  ) {}

  async companyCreatedConsumer(company: PlainCompany, context: KafkaContext) {
    const topic = context.getTopic();
    const {
      headers: { correlationId },
    } = context.getMessage();

    try {
      this.logger.log(topic, { correlationId, company });

      await this.companiesService.createOrUpdate(
        new UserCompany(company as unknown as UserCompanyDocument),
        correlationId as string,
      );
      this.logger.log(topic, { correlationId, company });
    } catch (err) {
      this.logger.error(topic, { correlationId, company, err });
    }
  }

  async companyUpdatedConsumer(company: PlainCompany, context: KafkaContext) {
    const topic = context.getTopic();
    const {
      headers: { correlationId },
    } = context.getMessage();

    try {
      await this.companyCreatedConsumer(company, context);
      await this.usersService.updateUserCompany(
        company,
        correlationId as string,
      );
    } catch (err) {
      this.logger.error(topic, { correlationId, company, err });
    }
  }
}
