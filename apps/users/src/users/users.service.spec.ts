import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { MockedMongooseFactory } from '@zeowna/mongoose';
import * as mongoose from 'mongoose';
import { disconnect } from 'mongoose';
import { BcryptHashService } from '../hash/bcrypt-hash.service';
import { PlainCompany } from '@zeowna/entities-definition';
import { UserCompaniesModule } from '../companies/user-companies.module';
import { UsersModule } from './users.module';
import { assertUser, generateCreateUserDto, generateUser } from './test';

const MongooseModule = MockedMongooseFactory.useMongoMemoryServer();

describe('UsersService', () => {
  let usersService: UsersService;
  let bcryptHashSpy: jest.SpyInstance;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.register(), UsersModule, UserCompaniesModule],
    }).compile();

    usersService = app.get<UsersService>(UsersService);
    bcryptHashSpy = jest.spyOn(BcryptHashService.prototype, 'hashPassword');
  });

  afterAll(async () => {
    await disconnect();
    await MongooseModule.disconnect();
  });

  it('should exist', () => {
    expect(usersService).toBeDefined();
  });

  describe('findByEmail()', () => {
    it('should exist', () => {
      expect(usersService.findByEmail).toBeDefined();
    });

    it("should rejects if User doesn't exists", async () => {
      const email = 'random@email.com';
      const expected = null;

      await expect(usersService.findByEmail(email)).resolves.toEqual(expected);
    });

    it('should resolve if User was found', async () => {
      const email = 'random@email.com';
      const expected = await usersService.create(
        generateCreateUserDto(generateUser({ email })),
      );

      const result = await usersService.findByEmail(email);

      assertUser(result, expected);
    });
  });

  describe('findByCpf()', () => {
    it('should exist', () => {
      expect(usersService.findByCpf).toBeDefined();
    });

    it("should rejects if User doesn't exists", async () => {
      const cpf = 'random';
      const expected = null;

      await expect(usersService.findByCpf(cpf)).resolves.toEqual(expected);
    });

    it('should resolve if User was found', async () => {
      const cpf = 'random@cpf.com';
      const expected = await usersService.create(
        generateCreateUserDto(generateUser({ cpf })),
      );

      const result = await usersService.findByCpf(cpf);

      assertUser(result, expected);
    });
  });

  describe('create', () => {
    it('should exist', () => {
      expect(usersService.create).toBeDefined();
    });

    it('should resolve User with encrypted password', async () => {
      const user = generateUser({ password: '123' });
      const createUserDto = generateCreateUserDto(user);

      const result = await usersService.create(createUserDto);

      expect(result).toEqual(generateUser({ ...user, id: result.id }));
      expect(bcryptHashSpy).toBeCalled();
    });
  });

  describe('updatePassword()', () => {
    it('should exist', () => {
      expect(usersService.updatePassword).toBeDefined();
    });

    it('should reject if no result was found', async () => {
      const id = new mongoose.Types.ObjectId().toHexString();
      const newPassword = '213';

      await expect(
        usersService.updatePassword(id, { newPassword }),
      ).rejects.toThrow(`User not found with id: ${id}`);
    });

    it('should resolve the updated User', async () => {
      const user = generateUser();
      const userCreateDto = generateCreateUserDto(user);
      const created = await usersService.create(userCreateDto);

      const newPassword = '213';

      const result = await usersService.updatePassword(created.id as string, {
        newPassword,
      });

      assertUser(result, created, true);
      expect(bcryptHashSpy).toBeCalled();
    });
  });

  describe('updateUserCompany()', () => {
    it('should exist', () => {
      expect(usersService.updateUserCompany).toBeDefined();
    });

    it('should update any Users with of a particular Company', async () => {
      const company: PlainCompany = {
        id: new mongoose.Types.ObjectId().toHexString(),
        name: 'Company Name',
        createdAt: new Date(),
        updatedAt: new Date(),
        units: [],
      };

      await usersService.updateUserCompany(company);
    });
  });
});
