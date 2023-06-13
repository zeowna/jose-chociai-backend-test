import { OmitType } from '@nestjs/mapped-types';
import { CreateUnitDto } from './create-unit.dto';

export class UpdateUnitDto extends OmitType(CreateUnitDto, ['companyId']) {}
