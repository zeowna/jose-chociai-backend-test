import { AbstractEntity, ID } from '@zeowna/common/entities/abstract.entity';

export type SortParams<T = AbstractEntity> = Partial<Record<keyof T, 1 | -1>>;

export interface RepositoryInterface<T extends AbstractEntity> {
  get entityName(): string;

  findAll(skip: number, limit: number, sort: SortParams): Promise<T[]>;

  findById(id: ID): Promise<T>;

  create(entity: T): Promise<T>;

  update(id: ID, entity: Partial<T>): Promise<T>;

  createOrUpdate(entity: T): Promise<T>;

  remove(id: ID): Promise<T>;
}
