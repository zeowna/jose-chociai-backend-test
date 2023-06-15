import {
  MockedMongooseEntity,
  MockedMongooseEntityDocument,
} from './mocked-mongoose.entity';
import * as mongoose from 'mongoose';

export const generateMockedMongooseEntityFunction = (
  props: Partial<MockedMongooseEntity> = {},
): MockedMongooseEntity =>
  new MockedMongooseEntity({
    id: props.id ?? new mongoose.Types.ObjectId(),
    mutableProp: 'any_string',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...props,
  } as MockedMongooseEntityDocument);
