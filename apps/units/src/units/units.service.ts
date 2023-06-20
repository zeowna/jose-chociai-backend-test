import { Injectable, NotFoundException } from '@nestjs/common';
import { AbstractService, ID } from '@zeowna/common';
import { Unit, UnitDocument } from './entities/unit.entity';
import { UnitsMongooseRepository } from './units-mongoose.repository';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { PlainCompany } from '@zeowna/entities-definition';
import { KafkaProducer, TopicsEnum } from '@zeowna/kafka';
import { UnitCompaniesService } from '../companies/unit-companies.service';
import {
  UnitCompany,
  UnitCompanyDocument,
} from '../companies/entities/unit-company.entity';

@Injectable()
export class UnitsService extends AbstractService<
  Unit,
  CreateUnitDto,
  UpdateUnitDto
> {
  constructor(
    private readonly unitsRepository: UnitsMongooseRepository,
    private readonly companiesService: UnitCompaniesService,
    private readonly kafkaProducer: KafkaProducer,
  ) {
    super(unitsRepository);
  }

  async findByIdAndCompanyId(id: string, companyId: string) {
    const found = await this.unitsRepository.findByIdAndCompanyId(
      id,
      companyId,
    );

    if (!found) {
      throw new NotFoundException(`Unit not found with id: ${id}`);
    }

    return found;
  }

  async create(createUnitDto: CreateUnitDto) {
    const company = await this.companiesService.findById(
      createUnitDto.companyId,
    );

    createUnitDto.company = company
      ? company
      : new UnitCompany({ id: createUnitDto.companyId } as UnitCompanyDocument);

    const created = await super.create(createUnitDto);

    await this.kafkaProducer.send({
      topic: TopicsEnum.UnitCreated,
      messages: [
        {
          key: TopicsEnum.UnitCreated,
          value: JSON.stringify(created.present()),
        },
      ],
    });

    return created;
  }

  async updateByCompanyId(id: ID, companyId: ID, updateUnitDto: UpdateUnitDto) {
    const found = await this.findByIdAndCompanyId(id, companyId);

    const updated = await this.unitsRepository.update(
      found.id,
      updateUnitDto as UnitDocument,
    );

    console.log({ updated });

    await this.kafkaProducer.send({
      topic: TopicsEnum.UnitUpdated,
      messages: [
        {
          key: TopicsEnum.UnitUpdated,
          value: JSON.stringify(updated.present()),
        },
      ],
    });

    return updated;
  }

  async updateUnitCompany(company: PlainCompany) {
    await this.unitsRepository.updateUnitCompany(company);
  }
}
