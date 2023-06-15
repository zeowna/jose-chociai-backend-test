import { PlainEntityInterface } from '@zeowna/entities-definition';
import { AssetStatusEnum } from '../../../../apps/assets/src/assets/entities/asset-status.enum';

export interface PlainAssetCompanyInterface extends PlainEntityInterface {
  name?: string;
}

export interface PlainAssetUnitInterface extends PlainEntityInterface {
  name?: string;
  companyId?: string;
}

export interface PlainAssetInterface extends PlainEntityInterface {
  name: string;
  description: string;
  model: string;
  owner: PlainAssetCompanyInterface;
  unit: PlainAssetUnitInterface;
  status: AssetStatusEnum;
  healthLevel: number;
  image?: string;
}
