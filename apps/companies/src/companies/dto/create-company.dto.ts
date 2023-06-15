import { IsDefined, IsString, Validate } from 'class-validator';
import { IsCNPJ } from 'brazilian-class-validator';
import { IsCompanyCnpjAlreadyInUse } from './is-company-cnpj-already-in-use.validation';

export class CreateCompanyDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsCNPJ()
  @Validate(IsCompanyCnpjAlreadyInUse)
  cnpj: string;
}
