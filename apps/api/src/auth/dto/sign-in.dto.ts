import { IsDefined, IsString } from 'class-validator';

export class SignInDto {
  @IsDefined()
  @IsString()
  email: string;

  @IsDefined()
  @IsString()
  password: string;
}
