import {
  AbstractEntity,
  ID,
  LoggerInterface,
  RepositoryInterface,
  ServiceInterface,
  SortParams,
} from '@zeowna/common';
import { NotFoundException } from '@nestjs/common';

export abstract class AbstractService<
  T extends AbstractEntity,
  CreateEntityDto = T,
  UpdateEntityDto = CreateEntityDto,
> implements ServiceInterface<T, CreateEntityDto, UpdateEntityDto>
{
  constructor(
    private readonly repositoryImpl: RepositoryInterface<T>,
    private readonly loggerImpl: LoggerInterface,
  ) {}

  async findAll(
    skip = 0,
    limit = 10,
    sort: SortParams = { createdAt: -1 },
    correlationId: string,
  ) {
    this?.loggerImpl?.info(`${this.constructor.name}.findAll()`, {
      skip,
      limit,
      sort,
      correlationId,
    });
    return this.repositoryImpl.findAll(skip, limit, sort);
  }

  async findById(id: ID, correlationId: string) {
    this?.loggerImpl?.info(`${this.constructor.name}.findById()`, {
      id,
      correlationId,
    });

    const found = await this.repositoryImpl.findById(id);

    if (!found) {
      throw new NotFoundException(
        `${this.repositoryImpl.entityName} not found with id: ${id}`,
      );
    }

    return found;
  }

  async create(createEntityDto: CreateEntityDto, correlationId: string) {
    this?.loggerImpl?.info(`${this.constructor.name}.create()`, {
      createEntityDto,
      correlationId,
    });

    return this.repositoryImpl.create(createEntityDto as any);
  }

  async update(
    id: any,
    updateEntityDto: UpdateEntityDto,
    correlationId: string,
  ) {
    this?.loggerImpl?.info(`${this.constructor.name}.update()`, {
      updateEntityDto,
      correlationId,
    });

    const existing = await this.findById(id, correlationId);
    return this.repositoryImpl.update(
      (existing as AbstractEntity).id,
      updateEntityDto as any,
    );
  }

  async remove(id: ID, correlationId: string) {
    this?.loggerImpl?.info(`${this.constructor.name}.remove()`, {
      id,
      correlationId,
    });

    const existing = await this.findById(id, correlationId);
    return this.repositoryImpl.remove((existing as AbstractEntity).id);
  }

  async createOrUpdate(
    createEntityDto: CreateEntityDto,
    correlationId: string,
  ) {
    this?.loggerImpl?.info(`${this.constructor.name}.createOrUpdate()`, {
      createEntityDto,
      correlationId,
    });

    return this.repositoryImpl.createOrUpdate(createEntityDto as any);
  }
}
