import { UsersConsumersService } from './users-consumers.service';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { UsersService } from '../users/users.service';
import { PlainCompanyInterface } from '@zeowna/entities-definition';
import mongoose from 'mongoose';
import { UserCompaniesService } from '../companies/user-companies.service';
import { TopicsEnum } from '@zeowna/kafka';
import { UserCompaniesModule } from '../companies/user-companies.module';
import { MockedMongooseModule } from '@zeowna/mongoose';
import { UsersModule } from '../users/users.module';
import { UsersConsumersModule } from './users-consumers.module';

describe('UsersConsumersService', () => {
  let mongod: MongoMemoryServer;
  let usersConsumersService: UsersConsumersService;
  let companiesCreateOrUpdateSpy: jest.SpyInstance;
  let updateUserCompanySpy: jest.SpyInstance;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        MockedMongooseModule(mongod),
        UsersConsumersModule,
        UsersModule,
        UserCompaniesModule,
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
    if (mongod) {
      await mongod.stop();
    }
  });

  describe('companyCreatedConsumer()', () => {
    it('should exist', () => {
      expect(usersConsumersService.companyCreatedConsumer).toBeDefined();
    });

    it('should create or update a UserCompany', async () => {
      const company: PlainCompanyInterface = {
        id: new mongoose.Types.ObjectId().toHexString(),
        name: 'Company Name',
        createdAt: new Date(),
        updatedAt: new Date(),
        units: [],
      };

      const context = {
        getTopic: () => TopicsEnum.CompanyCreated,
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
      const company: PlainCompanyInterface = {
        id: new mongoose.Types.ObjectId().toHexString(),
        name: 'Company Name',
        createdAt: new Date(),
        updatedAt: new Date(),
        units: [],
      };

      const context = {
        getTopic: () => TopicsEnum.CompanyCreated,
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
