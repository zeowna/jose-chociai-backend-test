import { AbstractEntity } from '@zeowna/common/entities/abstract.entity';
import { SortParams } from '@zeowna/common';

export interface ServiceInterface<
  T extends AbstractEntity,
  CreateEntityDto,
  UpdateEntityDto,
> {
  findAll(skip?: number, limit?: number, sort?: SortParams): Promise<T[]>;

  findById(id: any): Promise<T>;

  create(createEntityDto: CreateEntityDto): Promise<T>;

  update(id: any, updateEntityDto: UpdateEntityDto): Promise<T>;

  remove(id: any): Promise<T>;

  createOrUpdate(createEntityDto: CreateEntityDto): Promise<T>;
}
