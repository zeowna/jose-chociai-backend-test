import { Injectable } from '@nestjs/common';
import { AbstractService } from '@zeowna/common';
import { CompaniesMongooseRepository } from './companies-mongoose-repository';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PlainUnitInterface } from '@zeowna/entities-definition';
import { KafkaProducer, TopicsEnum } from '@zeowna/kafka';
import {
  CompanyUnit,
  CompanyUnitDocument,
} from '../units/entities/company-unit.entity';

@Injectable()
export class CompaniesService extends AbstractService<
  Company,
  CreateCompanyDto,
  UpdateCompanyDto
> {
  constructor(
    private readonly companiesRepository: CompaniesMongooseRepository,
    private readonly kafkaProducer: KafkaProducer,
  ) {
    super(companiesRepository);
  }

  async create(createEntityDto: CreateCompanyDto) {
    const created = await super.create(createEntityDto);

    await this.kafkaProducer.send({
      topic: TopicsEnum.CompanyCreated,
      messages: [
        {
          key: TopicsEnum.CompanyCreated,
          value: JSON.stringify(created.present()),
        },
      ],
    });

    return created;
  }

  async update(id: any, updateEntityDto: UpdateCompanyDto) {
    const updated = await super.update(id, updateEntityDto);

    await this.kafkaProducer.send({
      topic: TopicsEnum.CompanyUpdated,
      messages: [
        {
          key: TopicsEnum.CompanyUpdated,
          value: JSON.stringify(updated.present()),
        },
      ],
    });

    return updated;
  }

  async updateCompanyUnits(unit: PlainUnitInterface, maxUnits = 10) {
    const found = await this.companiesRepository.findById(unit.company.id);

    if (!found) {
      return;
    }

    const units = found.units.filter(
      ({ _id }) => _id.toHexString() !== unit.id,
    );

    units.push(new CompanyUnit(unit as unknown as CompanyUnitDocument));

    const index = units.length > maxUnits ? units.length - maxUnits : 0;
    const selected = units.splice(index, maxUnits);

    await this.companiesRepository.updateCompanyUnits(
      unit.company.id,
      selected,
    );
  }

  async findByCnpj(cnpj: string) {
    return this.companiesRepository.findByCnpj(cnpj);
  }
}
