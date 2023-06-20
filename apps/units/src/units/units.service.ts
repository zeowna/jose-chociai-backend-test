import { Injectable } from '@nestjs/common';
import { AbstractService } from '@zeowna/common';
import { Unit } from './entities/unit.entity';
import { UnitsMongooseRepository } from './units-mongoose.repository';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { PlainCompanyInterface } from '@zeowna/entities-definition';
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
    return this.unitsRepository.findByIdAndCompanyId(id, companyId);
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

  async update(id: string, updateUnitDto: UpdateUnitDto) {
    const updated = await super.update(id, updateUnitDto);

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

  async updateUnitCompany(company: PlainCompanyInterface) {
    await this.unitsRepository.updateUnitCompany(company);
  }
}
