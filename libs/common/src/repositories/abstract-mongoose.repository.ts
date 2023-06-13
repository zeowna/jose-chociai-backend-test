import { Model } from 'mongoose';
import {
  AbstractMongooseEntity,
  RepositoryInterface,
  SortParams,
} from '@zeowna/common';

export abstract class AbstractMongooseRepository<
  T extends AbstractMongooseEntity,
> implements RepositoryInterface<T>
{
  constructor(private readonly mongooseRepository: Model<T>) {}

  async findAll(skip: number, limit: number, sort: SortParams) {
    return this.mongooseRepository
      .find()
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .exec();
  }

  async findById(id: any) {
    return this.mongooseRepository.findById(id).exec();
  }

  async create(entity: T) {
    return this.mongooseRepository.create(entity);
  }

  update(id: any, entity: Partial<T>) {
    return this.mongooseRepository.findOneAndUpdate(id, entity, { new: true });
  }

  remove(id: any) {
    return this.mongooseRepository.findByIdAndRemove(id);
  }

  get entityName() {
    return this.mongooseRepository.modelName;
  }
}
