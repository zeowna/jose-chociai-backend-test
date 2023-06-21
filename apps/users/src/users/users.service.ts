import { Injectable } from '@nestjs/common';
import { AbstractService } from '@zeowna/common';
import { User, UserDocument } from './entities/user.entity';
import { UsersMongooseRepository } from './users-mongoose-repository.service';
import { BcryptHashService } from '../hash/bcrypt-hash.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PlainCompany } from '@zeowna/entities-definition';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UserCompaniesService } from '../companies/user-companies.service';
import {
  UserCompany,
  UserCompanyDocument,
} from '../companies/entities/user-company.entity';
import { NestLoggerService } from '@zeowna/logger';

@Injectable()
export class UsersService extends AbstractService<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(
    private readonly usersRepository: UsersMongooseRepository,
    private readonly companiesService: UserCompaniesService,
    private readonly hashService: BcryptHashService,
    private readonly logger: NestLoggerService,
  ) {
    super(usersRepository, logger);
  }

  async findByCpf(cpf: string, correlationId?: string) {
    this.logger.info('UsersService.findByCpf()', { cpf, correlationId });
    return this.usersRepository.findByCpf(cpf);
  }

  async findByEmail(email: string, correlationId?: string) {
    this.logger.info('UsersService.findByEmail()', { email, correlationId });
    return this.usersRepository.findByEmail(email);
  }

  async create(createUserDto: CreateUserDto, correlationId: string) {
    this.logger.info(`UsersService.create()`, {
      createUserDto: {
        ...createUserDto,
        password: createUserDto.password ? '<deleted>' : undefined,
      },
      correlationId,
    });

    const company = await this.companiesService.findById(
      createUserDto.companyId,
    );

    return this.usersRepository.create(
      new User({
        ...createUserDto,
        password: await this.hashService.hashPassword(createUserDto.password),
        company: company
          ? company
          : new UserCompany({
              id: createUserDto.companyId,
            } as UserCompanyDocument),
      } as UserDocument),
    );
  }

  async updatePassword(
    id: string,
    updateUserPasswordDto: UpdateUserPasswordDto,
    correlationId: string,
  ) {
    this.logger.info('UsersService.updatePassword()', {
      id,
      updateUserPasswordDto: {
        newPassword: updateUserPasswordDto.newPassword
          ? '<deleted>'
          : undefined,
      },
      correlationId,
    });

    const existing = await super.findById(id, correlationId);

    return this.usersRepository.updatePassword(
      existing.id as string,
      await this.hashService.hashPassword(updateUserPasswordDto.newPassword),
    );
  }

  async updateUserCompany(company: PlainCompany, correlationId: string) {
    this.logger.info('UsersService.updateUserCompany()', {
      company,
      correlationId,
    });

    return this.usersRepository.updateUserCompany(company);
  }
}
