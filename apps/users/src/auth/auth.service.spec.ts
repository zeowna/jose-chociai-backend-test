import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { MockedMongooseFactory } from '@zeowna/mongoose';
import { HashModule } from '../hash/hash.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { generateCreateUserDto, generateUser } from '../users/test';
import { disconnect } from 'mongoose';
import { ZeownaLoggerModule } from '@zeowna/logger';
import { ZeownaAuthModule } from '@zeowna/auth';

const MongooseModule = MockedMongooseFactory.useMongoMemoryServer();

describe('AuthService', () => {
  const correlationId = 'any_string';
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.register(),
        JwtModule,
        UsersModule,
        HashModule,
        ZeownaAuthModule.register({ global: true }),
        ZeownaLoggerModule.register({ global: true }),
      ],
      providers: [AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(async () => {
    await disconnect();
    await MongooseModule.disconnect();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signIn', () => {
    it('should be defined', () => {
      expect(authService.signIn).toBeDefined();
    });

    it("should reject with Unauthorized if password isn't equal", async () => {
      const createUserDto = generateCreateUserDto(generateUser());
      await usersService.create(createUserDto, correlationId);

      await expect(
        authService.signIn(
          createUserDto.email,
          'wrong password',
          correlationId,
        ),
      ).rejects.toThrow("User password doesn't match");
    });

    it('should resolve if password is equal', async () => {
      const createUserDto = generateCreateUserDto(generateUser());
      await usersService.create(createUserDto, correlationId);

      await expect(
        authService.signIn(
          createUserDto.email,
          createUserDto.password,
          correlationId,
        ),
      ).resolves.not.toThrow();
    });
  });
});
