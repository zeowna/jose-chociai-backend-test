import { Injectable, NotFoundException } from '@nestjs/common';
import { AbstractService } from '@zeowna/common';
import { User } from './entities/user';
import { UserMongooseRepository } from './user-mongoose.repository';
import { BcryptHashService } from '../hash/bcrypt-hash.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService extends AbstractService<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(
    private readonly repository: UserMongooseRepository,
    private readonly hashService: BcryptHashService,
  ) {
    super(repository);
  }

  async findByEmail(email: string) {
    const found = await this.repository.findByEmail(email);

    if (!found) {
      throw new NotFoundException(
        `${this.repository.entityName} not found with email: ${email}`,
      );
    }

    return found;
  }

  async create(createUserDto: CreateUserDto) {
    return super.create({
      ...createUserDto,
      password: await this.hashService.hashPassword(createUserDto.password),
      company: { _id: createUserDto.companyId },
    });
  }
}
