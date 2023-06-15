import { IsDefined, IsEmail, IsString, Validate } from 'class-validator';
import { IsUserEmailAlreadyInUse } from './is-user-email-already-in-use.validation';
import { UserCompany } from '../../companies/entities/user-company.entity';
import { IsCPF } from 'brazilian-class-validator';
import { IsUserCpfAlreadyInUse } from './is-user-cpf-already-in-use.validation';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  @ApiProperty()
  name: string;

  @IsDefined()
  @IsCPF()
  @Validate(IsUserCpfAlreadyInUse)
  @ApiProperty()
  cpf: string;

  @IsDefined()
  @IsEmail()
  @Validate(IsUserEmailAlreadyInUse)
  @ApiProperty()
  email: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  password: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  companyId?: string;

  company: UserCompany;
}
