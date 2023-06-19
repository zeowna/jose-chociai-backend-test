import { HydratedDocument, Model } from 'mongoose';
import { ID, RepositoryInterface, SortParams } from '@zeowna/common';
import { AbstractMongooseEntity } from '../entities/abstract-mongoose.entity';

export abstract class AbstractMongooseRepository<
  T extends AbstractMongooseEntity,
> implements RepositoryInterface<T>
{
  constructor(
    private readonly mongooseRepositoryImpl: Model<T>,
    private readonly EntityConstructor: new (
      document: HydratedDocument<T>,
    ) => T,
  ) {}

  private documentToEntity(document: any) {
    if (!document) {
      return null;
    }

    return new this.EntityConstructor(document);
  }

  async findAll(skip: number, limit: number, sort: SortParams) {
    const foundList = await this.mongooseRepositoryImpl
      .find()
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .lean()
      .exec();

    return foundList.map((document) => this.documentToEntity(document));
  }

  async findById(id: ID) {
    return this.documentToEntity(
      await this.mongooseRepositoryImpl.findById(id).lean().exec(),
    );
  }

  async create(entity: T) {
    return this.documentToEntity(
      await this.mongooseRepositoryImpl.create(entity),
    );
  }

  async update(id: ID, entity: Partial<T>) {
    return this.documentToEntity(
      await this.mongooseRepositoryImpl
        .findByIdAndUpdate(
          id,
          { $set: entity },
          {
            new: true,
          },
        )
        .lean()
        .exec(),
    );
  }

  async remove(id: ID) {
    return this.documentToEntity(
      await this.mongooseRepositoryImpl.findByIdAndRemove(id).lean().exec(),
    );
  }

  async createOrUpdate(entity: T) {
    const updated = await this.update(entity.id, entity);

    if (updated) {
      return updated;
    }

    return this.create(entity);
  }

  get entityName() {
    return this.mongooseRepositoryImpl.modelName;
  }
}
