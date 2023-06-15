import { IsDefined, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @IsDefined()
  @IsString()
  @ApiProperty()
  email: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  password: string;
}
