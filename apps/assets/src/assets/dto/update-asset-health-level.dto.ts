import { IsDefined, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAssetHealthLevelDto {
  @ApiProperty()
  @IsDefined()
  @Max(1)
  @Min(0)
  healthLevel: number;
}
