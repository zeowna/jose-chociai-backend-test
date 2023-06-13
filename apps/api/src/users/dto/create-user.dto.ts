import { IsDefined, IsEmail, IsString, Validate } from 'class-validator';
import { IsUserEmailAlreadyInUse } from './is-user-email-already-in-use.validation';
import { UserCompany } from '../entities/user-company.entity';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsEmail()
  @Validate(IsUserEmailAlreadyInUse)
  email: string;

  @IsDefined()
  @IsString()
  password: string;

  @IsDefined()
  @IsString()
  companyId?: string;

  company: Partial<UserCompany>;
}
