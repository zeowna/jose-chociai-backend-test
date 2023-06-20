import { IsDefined, IsString, Validate } from 'class-validator';
import { IsCNPJ } from 'brazilian-class-validator';
import { IsCompanyCnpjAlreadyInUse } from './is-company-cnpj-already-in-use.validation';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDefined()
  @IsCNPJ()
  @Validate(IsCompanyCnpjAlreadyInUse)
  cnpj: string;
}
