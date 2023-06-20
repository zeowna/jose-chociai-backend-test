import { IsDefined, IsString } from 'class-validator';
import { UnitCompany } from '../../companies/entities/unit-company.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUnitDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  name: string;

  companyId?: string;

  company: Partial<UnitCompany>;
}
