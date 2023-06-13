import { AbstractEntity } from '@zeowna/common/entities/abstract.entity';

export type SortParams<T = AbstractEntity> = Partial<Record<keyof T, 1 | -1>>;

export interface RepositoryInterface<T extends AbstractEntity> {
  entityName: string;

  findAll(skip: number, limit: number, sort: SortParams): Promise<T[]>;

  findById(id: any): Promise<T>;

  create(entity: T): Promise<T>;

  update(id: any, entity: Partial<T>): Promise<T>;

  remove(id: any): Promise<T>;
}
