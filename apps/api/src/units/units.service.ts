import { Injectable } from '@nestjs/common';
import { AbstractService } from '@zeowna/common';
import { Unit } from './entities/unit.entity';
import { UnitsMongooseRepository } from './units-mongoose-repository.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';

@Injectable()
export class UnitsService extends AbstractService<
  Unit,
  CreateUnitDto,
  UpdateUnitDto
> {
  constructor(private readonly unitRepository: UnitsMongooseRepository) {
    super(unitRepository);
  }

  async create(createCompanyDto: CreateUnitDto) {
    return super.create({
      ...createCompanyDto,
      company: { _id: createCompanyDto.companyId },
    });
  }
}
