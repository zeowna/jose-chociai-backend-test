import { Injectable } from '@nestjs/common';
import { AbstractService } from '@zeowna/common';
import { Unit } from './entities/unit.entity';
import { UnitsMongooseRepository } from './units-mongoose.repository';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { PlainCompanyInterface } from '@zeowna/entities-definition';
import { KafkaProducer, TopicsEnum } from '@zeowna/kafka';
import { UnitCompaniesService } from '../companies/unit-companies.service';

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

    console.log('UnitsService.create', { createUnitDto, company });

    const created = await super.create({
      ...createUnitDto,
      company: company ? company : { _id: createUnitDto.companyId },
    });

    await this.kafkaProducer.send({
      topic: TopicsEnum.UnitCreated,
      messages: [
        { key: TopicsEnum.UnitCreated, value: JSON.stringify(created) },
      ],
    });

    return created;
  }

  async update(id: string, updateUnitDto: UpdateUnitDto) {
    const updated = await super.update(id, updateUnitDto);

    await this.kafkaProducer.send({
      topic: TopicsEnum.UnitUpdated,
      messages: [
        { key: TopicsEnum.UnitUpdated, value: JSON.stringify(updated) },
      ],
    });

    return updated;
  }

  async updateUnitCompany(company: PlainCompanyInterface) {
    await this.unitsRepository.updateUnitCompany(company);
  }
}
