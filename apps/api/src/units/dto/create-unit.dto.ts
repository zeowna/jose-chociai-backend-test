import { IsDefined, IsString } from 'class-validator';
import { UnitCompany } from '../entities/unit-company.entity';

export class CreateUnitDto {
  @IsDefined()
  @IsString()
  name: string;

  companyId?: string;

  company: Partial<UnitCompany>;
}
