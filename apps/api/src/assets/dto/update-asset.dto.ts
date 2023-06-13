import { PartialType } from '@nestjs/mapped-types';
import { CreateAssetDto } from './create-asset.dto';
import { IsDefined, IsString } from 'class-validator';

export class UpdateAssetDto extends PartialType(CreateAssetDto) {
  @IsDefined()
  @IsString()
  name: string;
}
