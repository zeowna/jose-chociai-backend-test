import { PlainEntity } from './plain-entity.interface';

export interface PlainCompanyUnit extends PlainEntity {
  name?: string;
}

export interface PlainCompany extends PlainEntity {
  name: string;
  cnpj: string;
  units?: PlainCompanyUnit[];
}
