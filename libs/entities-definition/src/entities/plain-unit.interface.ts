import { PlainEntity } from './plain-entity.interface';

export interface PlainUnitCompany extends PlainEntity {
  name?: string;
}

export interface PlainUnitInterface extends PlainEntity {
  name: string;
  company: PlainUnitCompany;
}
