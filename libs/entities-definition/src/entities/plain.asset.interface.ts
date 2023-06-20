import { PlainEntity } from '@zeowna/entities-definition';
import { AssetStatusEnum } from '../../../../apps/assets/src/assets/entities/asset-status.enum';

export interface PlainAssetCompany extends PlainEntity {
  name?: string;
}

export interface PlainAssetUnit extends PlainEntity {
  name?: string;
  companyId?: string;
}

export interface PlainAsset extends PlainEntity {
  name: string;
  description: string;
  model: string;
  owner: PlainAssetCompany;
  unit: PlainAssetUnit;
  status: AssetStatusEnum;
  healthLevel: number;
  image?: string;
}
