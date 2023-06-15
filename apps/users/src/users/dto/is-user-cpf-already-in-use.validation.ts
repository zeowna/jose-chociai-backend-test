import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../users.service';

@Injectable()
@ValidatorConstraint({ name: 'isUserCpfAlreadyInUse', async: true })
export class IsUserCpfAlreadyInUse implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {}

  async validate(cpf: string) {
    const exists = await this.usersService.findByCpf(cpf);
    return !exists;
  }

  defaultMessage() {
    return 'User already exists with cpf: $value';
  }
}
