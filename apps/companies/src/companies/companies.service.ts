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
import { NestLoggerService } from '@zeowna/logger';

@Injectable()
export class CompaniesService extends AbstractService<
  Company,
  CreateCompanyDto,
  UpdateCompanyDto
> {
  constructor(
    private readonly companiesRepository: CompaniesMongooseRepository,
    private readonly kafkaProducer: KafkaProducer,
    private readonly logger: NestLoggerService,
  ) {
    super(companiesRepository, logger);
  }

  async create(createEntityDto: CreateCompanyDto, correlationId: string) {
    this.logger.info('CompaniesService.create()', {
      createEntityDto,
      correlationId,
    });
    const created = await super.create(createEntityDto, correlationId);

    await this.kafkaProducer.send({
      topic: TopicsEnum.CompanyCreated,
      messages: [
        {
          key: TopicsEnum.CompanyCreated,
          value: JSON.stringify(created.present()),
          headers: {
            correlationId,
          },
        },
      ],
    });

    return created;
  }

  async update(
    id: any,
    updateEntityDto: UpdateCompanyDto,
    correlationId: string,
  ) {
    this.logger.info('CompaniesService.update()', {
      updateEntityDto,
      correlationId,
    });
    const updated = await super.update(id, updateEntityDto, correlationId);

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

  async updateCompanyUnits(
    unit: PlainUnitInterface,
    correlationId: string,
    maxUnits = 10,
  ) {
    this.logger.info('CompaniesService.updateCompanyUnits()', {
      unit,
      maxUnits,
      correlationId,
    });

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

    this.logger.info('pushing CompanyUnits into Company', {
      units: selected,
      company: found,
      correlationId,
    });

    await this.companiesRepository.updateCompanyUnits(
      unit.company.id,
      selected,
    );
  }

  async findByCnpj(cnpj: string, correlationId: string) {
    this.logger.info('CompaniesService.findByCnpj()', {
      cnpj,
      correlationId,
    });

    return this.companiesRepository.findByCnpj(cnpj);
  }
}
