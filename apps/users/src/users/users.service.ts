import { Injectable } from '@nestjs/common';
import { AbstractService } from '@zeowna/common';
import { User } from './entities/user.entity';
import { UserMongooseRepository } from './user-mongoose.repository';
import { BcryptHashService } from '../hash/bcrypt-hash.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PlainCompanyInterface } from '@zeowna/entities-definition';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UserCompaniesService } from '../companies/user-companies.service';
import {
  UserCompany,
  UserCompanyDocument,
} from '../companies/entities/user-company.entity';

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
  ) {
    super(repository);
  }

  async findByCpf(cpf: string) {
    return this.repository.findByCpf(cpf);
  }

  async findByEmail(email: string, includePassword = false) {
    return this.repository.findByEmail(email, includePassword);
  }

  async create(createUserDto: CreateUserDto) {
    const company = await this.companiesService.findById(
      createUserDto.companyId,
    );

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
  ) {
    const existing = await super.findById(id);

    return this.repository.updatePassword(
      existing.id as string,
      await this.hashService.hashPassword(updateUserPasswordDto.newPassword),
    );
  }

  async updateUserCompany(company: PlainCompanyInterface) {
    return this.repository.updateUserCompany(company);
  }
}
