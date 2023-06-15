import { IsDefined, IsString } from 'class-validator';
import { UnitCompany } from '../../companies/entities/unit-company.entity';

export class CreateUnitDto {
  @IsDefined()
  @IsString()
  name: string;

  companyId?: string;

  company: Partial<UnitCompany>;
}
