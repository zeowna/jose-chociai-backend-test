import {
  AbstractEntity,
  ID,
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
  constructor(private readonly repositoryImpl: RepositoryInterface<T>) {}

  async findAll(skip = 0, limit = 10, sort: SortParams = { createdAt: -1 }) {
    return this.repositoryImpl.findAll(skip, limit, sort);
  }

  async findById(id: any) {
    const found = await this.repositoryImpl.findById(id);

    if (!found) {
      throw new NotFoundException(
        `${this.repositoryImpl.entityName} not found with id: ${id}`,
      );
    }

    return found;
  }

  async create(createEntityDto: CreateEntityDto) {
    return this.repositoryImpl.create(createEntityDto as any);
  }

  async update(id: any, updateEntityDto: UpdateEntityDto) {
    const existing = await this.findById(id);
    return this.repositoryImpl.update(
      (existing as AbstractEntity).id,
      updateEntityDto as any,
    );
  }

  async remove(id: ID) {
    const existing = await this.findById(id);
    return this.repositoryImpl.remove((existing as AbstractEntity).id);
  }

  async createOrUpdate(createEntityDto: CreateEntityDto) {
    return this.repositoryImpl.createOrUpdate(createEntityDto as any);
  }
}
