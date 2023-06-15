import { IsDefined, IsOptional, IsString } from 'class-validator';
import { AssetCompany } from '../../companies/entities/asset-company.entity';
import { AssetUnit } from '../../units/entities/asset-unit.entity';

export class CreateAssetDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  description: string;

  @IsDefined()
  @IsString()
  model: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsDefined()
  @IsString()
  unitId: string;

  ownerId: string;
  unit: Partial<AssetUnit>;
  owner: Partial<AssetCompany>;
}
