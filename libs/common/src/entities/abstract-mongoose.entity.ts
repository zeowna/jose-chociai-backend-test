import { AbstractEntity } from './abstract.entity';

export abstract class AbstractMongooseEntity extends AbstractEntity {
  readonly _id?: any;
  readonly __v?: any;
}
