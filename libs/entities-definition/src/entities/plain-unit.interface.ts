import { PlainEntityInterface } from './plain-entity.interface';

export interface PlainUnitCompanyInterface extends PlainEntityInterface {
  name?: string;
}

export interface PlainUnitInterface extends PlainEntityInterface {
  name: string;
  company: PlainUnitCompanyInterface;
}
