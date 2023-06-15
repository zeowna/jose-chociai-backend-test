import { IsDefined, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserPasswordDto {
  @IsDefined()
  @IsString()
  @ApiProperty()
  newPassword: string;
}
