import {
  MockedMongooseEntity,
  MockedMongooseEntityDocument,
} from './mocked-mongoose.entity';
import mongoose from 'mongoose';

export const generateMockedMongooseEntity = (
  props: Partial<MockedMongooseEntity> = {},
) =>
  new MockedMongooseEntity({
    mutableProp: 'any_string',
    createdAt: new Date(),
    updatedAt: new Date(),
    id: props?.id,
    _id: props?.id ? new mongoose.Types.ObjectId(props?.id) : undefined,
    ...props,
  } as MockedMongooseEntityDocument);
