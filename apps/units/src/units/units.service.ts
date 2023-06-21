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
import { NestLoggerService } from '@zeowna/logger';

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
    private readonly logger: NestLoggerService,
  ) {
    super(unitsRepository, logger);
  }

  async findByIdAndCompanyId(
    id: string,
    companyId: string,
    correlationId: string,
  ) {
    this.logger.info('UnitsService.findByIdAndCompanyId()', {
      id,
      companyId,
      correlationId,
    });

    const found = await this.unitsRepository.findByIdAndCompanyId(
      id,
      companyId,
    );

    if (!found) {
      throw new NotFoundException(`Unit not found with id: ${id}`);
    }

    return found;
  }

  async create(createUnitDto: CreateUnitDto, correlationId: string) {
    this.logger.info('UnitsService.create()', {
      createUnitDto,
      correlationId,
    });

    const company = await this.companiesService.findById(
      createUnitDto.companyId,
    );

    createUnitDto.company = company
      ? company
      : new UnitCompany({ id: createUnitDto.companyId } as UnitCompanyDocument);

    const created = await super.create(createUnitDto, correlationId);

    await this.kafkaProducer.send({
      topic: TopicsEnum.UnitCreated,
      messages: [
        {
          key: TopicsEnum.UnitCreated,
          value: JSON.stringify(created.present()),
          headers: { correlationId },
        },
      ],
    });

    return created;
  }

  async updateByCompanyId(
    id: ID,
    companyId: ID,
    updateUnitDto: UpdateUnitDto,
    correlationId: string,
  ) {
    this.logger.info('UnitsService.updateByCompanyId()', {
      id,
      companyId,
      updateUnitDto,
      correlationId,
    });

    const found = await this.findByIdAndCompanyId(id, companyId, correlationId);

    const updated = await this.unitsRepository.update(
      found.id,
      updateUnitDto as UnitDocument,
    );

    await this.kafkaProducer.send({
      topic: TopicsEnum.UnitUpdated,
      messages: [
        {
          key: TopicsEnum.UnitUpdated,
          value: JSON.stringify(updated.present()),
          headers: { correlationId },
        },
      ],
    });

    return updated;
  }

  async updateUnitCompany(company: PlainCompany, correlationId: string) {
    this.logger.info('UnitsService.updateUnitCompany()', {
      company,
      correlationId,
    });

    await this.unitsRepository.updateUnitCompany(company);
  }
}
