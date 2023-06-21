import { AbstractEntity, ID } from '@zeowna/common/entities/abstract.entity';
import { SortParams } from '@zeowna/common';

export interface ServiceInterface<
  T extends AbstractEntity,
  CreateEntityDto,
  UpdateEntityDto,
> {
  findAll(
    skip: number,
    limit: number,
    sort: SortParams,
    correlationId: string,
  ): Promise<T[]>;

  findById(id: ID, correlationId: string): Promise<T>;

  create(createEntityDto: CreateEntityDto, correlationId: string): Promise<T>;

  update(
    id: any,
    updateEntityDto: UpdateEntityDto,
    correlationId: string,
  ): Promise<T>;

  remove(id: ID, correlationId: string): Promise<T>;

  createOrUpdate(
    createEntityDto: CreateEntityDto,
    correlationId: string,
  ): Promise<T>;
}
