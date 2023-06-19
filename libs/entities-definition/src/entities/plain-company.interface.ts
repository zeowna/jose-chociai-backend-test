import { PlainEntityInterface } from './plain-entity.interface';

export interface PlainCompanyUnitInterface extends PlainEntityInterface {
  name?: string;
}

export interface PlainCompanyInterface extends PlainEntityInterface {
  name: string;
  cnpj: string;
  units?: PlainCompanyUnitInterface[];
}
