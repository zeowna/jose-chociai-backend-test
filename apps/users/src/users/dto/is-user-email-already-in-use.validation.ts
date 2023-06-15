import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../users.service';

@Injectable()
@ValidatorConstraint({ name: 'isUserEmailAlreadyInUse', async: true })
export class IsUserEmailAlreadyInUse implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {}

  async validate(email: string) {
    const exists = await this.usersService.findByEmail(email);

    return !exists;
  }

  defaultMessage() {
    return 'User already exists with email: $value';
  }
}
