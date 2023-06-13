import { IsDefined, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsDefined()
  @IsString()
  name: string;
}
