import { Test, TestingModule } from '@nestjs/testing';
import { UserCompaniesModule } from './user-companies.module';
import { UserCompaniesService } from './user-companies.service';
import { MockedMongooseFactory } from '@zeowna/mongoose';
import * as mongoose from 'mongoose';
import { disconnect } from 'mongoose';
import {
  UserCompany,
  UserCompanyDocument,
} from './entities/user-company.entity';
import { ZeownaLoggerModule } from '@zeowna/logger';
import { ZeownaAuthModule } from '@zeowna/auth';

const MongooseModule = MockedMongooseFactory.useMongoMemoryServer();
describe('UserCompaniesService', () => {
  const correlationId = 'any_string';
  let userCompaniesService: UserCompaniesService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.register(),
        UserCompaniesModule,
        ZeownaAuthModule.register({ global: true }),
        ZeownaLoggerModule.register({ global: true }),
      ],
    }).compile();

    userCompaniesService = app.get<UserCompaniesService>(UserCompaniesService);
  });

  afterAll(async () => {
    await disconnect();
    await MongooseModule.disconnect();
  });

  describe('findById()', () => {
    it('should exist', () => {
      expect(userCompaniesService.findById).toBeDefined();
    });

    it('should resolve null if no UserCompany was found', async () => {
      const id = new mongoose.Types.ObjectId().toHexString();
      const expected = null;

      await expect(userCompaniesService.findById(id)).resolves.toEqual(
        expected,
      );
    });

    it('should resolve UserCompany by id', async () => {
      const expected = await userCompaniesService.create(
        new UserCompany({
          id: new mongoose.Types.ObjectId().toHexString(),
          name: 'CompanyName',
        } as UserCompanyDocument),
        correlationId,
      );
      await expect(userCompaniesService.findById(expected.id)).resolves.toEqual(
        expected,
      );
    });
  });
});
