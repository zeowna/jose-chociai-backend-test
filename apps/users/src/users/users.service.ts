import { Injectable } from '@nestjs/common';
import { AbstractService } from '@zeowna/common';
import { User } from './entities/user.entity';
import { UserMongooseRepository } from './user-mongoose.repository';
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
    private readonly repository: UserMongooseRepository,
    private readonly companiesService: UserCompaniesService,
    private readonly hashService: BcryptHashService,
    private readonly logger: NestLoggerService,
  ) {
    super(repository, logger);
  }

  async findByCpf(cpf: string) {
    this.logger.info('UsersService.findByCpf()', { cpf });
    return this.repository.findByCpf(cpf);
  }

  async findByEmail(email: string) {
    this.logger.info('UsersService.findByEmail()', { email });
    return this.repository.findByEmail(email);
  }

  async create(createUserDto: CreateUserDto, correlationId: string) {
    this.logger.info(`UsersService.create()`, {
      createUserDto,
      correlationId,
    });

    const company = await this.companiesService.findById(
      createUserDto.companyId,
    );

    this.logger.info('Will attach UserCompany', { createUserDto, company });

    return super.create({
      ...createUserDto,
      password: await this.hashService.hashPassword(createUserDto.password),
      company: company
        ? company
        : new UserCompany({
            id: createUserDto.companyId,
          } as UserCompanyDocument),
    });
  }

  async updatePassword(
    id: string,
    updateUserPasswordDto: UpdateUserPasswordDto,
    correlationId: string,
  ) {
    this.logger.info('UsersService.updatePassword()', {
      id,
      updateUserPasswordDto,
      correlationId,
    });

    const existing = await super.findById(id);

    return this.repository.updatePassword(
      existing.id as string,
      await this.hashService.hashPassword(updateUserPasswordDto.newPassword),
    );
  }

  async updateUserCompany(company: PlainCompany, correlationId: string) {
    this.logger.info('UsersService.updateUserCompany()', {
      company,
      correlationId,
    });

    return this.repository.updateUserCompany(company);
  }
}
