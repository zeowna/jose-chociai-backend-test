import { UsersConsumersService } from './users-consumers.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { PlainCompany } from '@zeowna/entities-definition';
import mongoose, { disconnect } from 'mongoose';
import { UserCompaniesService } from '../companies/user-companies.service';
import { TopicsEnum } from '@zeowna/kafka';
import { UserCompaniesModule } from '../companies/user-companies.module';
import { MockedMongooseFactory } from '@zeowna/mongoose';
import { UsersModule } from '../users/users.module';
import { UsersConsumersModule } from './users-consumers.module';
import { ZeownaLoggerModule } from '@zeowna/logger';
import { ZeownaAuthModule } from '@zeowna/auth';

const MockedMongooseModule = MockedMongooseFactory.useMongoMemoryServer();

describe('UsersConsumersService', () => {
  const correlationId = 'any_string';
  let usersConsumersService: UsersConsumersService;
  let companiesCreateOrUpdateSpy: jest.SpyInstance;
  let updateUserCompanySpy: jest.SpyInstance;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        MockedMongooseModule.register(),
        UsersConsumersModule,
        UsersModule,
        UserCompaniesModule,
        ZeownaAuthModule.register({ global: true }),
        ZeownaLoggerModule.register({ global: true }),
      ],
    }).compile();

    usersConsumersService = app.get<UsersConsumersService>(
      UsersConsumersService,
    );
    companiesCreateOrUpdateSpy = jest.spyOn(
      UserCompaniesService.prototype,
      'createOrUpdate',
    );
    updateUserCompanySpy = jest.spyOn(
      UsersService.prototype,
      'updateUserCompany',
    );
  });

  afterEach(async () => {
    await disconnect();
    await MockedMongooseModule.disconnect();
  });

  describe('companyCreatedConsumer()', () => {
    it('should exist', () => {
      expect(usersConsumersService.companyCreatedConsumer).toBeDefined();
    });

    it('should create or update a UserCompany', async () => {
      const company: PlainCompany = {
        id: new mongoose.Types.ObjectId().toHexString(),
        name: 'Company Name',
        cnpj: 'any_string',
        createdAt: new Date(),
        updatedAt: new Date(),
        units: [],
      };

      const context = {
        getTopic: () => TopicsEnum.CompanyCreated,
        getMessage: () => ({
          headers: {
            correlationId,
          },
        }),
      };

      await usersConsumersService.companyUpdatedConsumer(
        company,
        context as any,
      );
      expect(companiesCreateOrUpdateSpy).toBeCalled();
    });
  });

  describe('companyUpdatedConsumer()', () => {
    it('should exist', () => {
      expect(usersConsumersService.companyUpdatedConsumer).toBeDefined();
    });

    it('should create or update a UserCompany', async () => {
      const company: PlainCompany = {
        id: new mongoose.Types.ObjectId().toHexString(),
        cnpj: 'any_string',
        name: 'Company Name',
        createdAt: new Date(),
        updatedAt: new Date(),
        units: [],
      };

      const context = {
        getTopic: () => TopicsEnum.CompanyCreated,
        getMessage: () => ({ headers: { correlationId } }),
      };

      await usersConsumersService.companyUpdatedConsumer(
        company,
        context as any,
      );
      expect(companiesCreateOrUpdateSpy).toBeCalled();
      expect(updateUserCompanySpy).toBeCalled();
    });
  });
});
