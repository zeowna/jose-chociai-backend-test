import { IsDefined, IsOptional, IsString } from 'class-validator';
import { AssetCompany } from '../../companies/entities/asset-company.entity';
import { AssetUnit } from '../../units/entities/asset-unit.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAssetDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  description: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  model: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  image: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  unitId: string;

  ownerId: string;
  unit: Partial<AssetUnit>;
  owner: Partial<AssetCompany>;
}
