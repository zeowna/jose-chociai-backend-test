import { Injectable, NotFoundException } from '@nestjs/common';
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
    try {
      const exists = await this.usersService.findByEmail(email);

      return !exists;
    } catch (err) {
      if (err instanceof NotFoundException) {
        return true;
      }

      throw err;
    }
  }

  defaultMessage() {
    return 'User already exists with email: $value';
  }
}
