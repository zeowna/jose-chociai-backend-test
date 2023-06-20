import {
  MockedMongooseEntity,
  MockedMongooseEntityDocument,
} from '@zeowna/mongoose/entities/mocked-mongoose.entity';

export const generateMockedMongooseEntity = (
  props: Partial<MockedMongooseEntity> = {},
) =>
  new MockedMongooseEntity({
    mutableProp: 'any_string',
    createdAt: new Date(),
    updatedAt: new Date(),
    id: props?.id,
    ...props,
  } as MockedMongooseEntityDocument);

export const assertMockedMongooseEntity = (
  received: MockedMongooseEntity,
  expected: MockedMongooseEntity,
  isUpdate = false,
) => {
  expect(received._id.toHexString()).toEqual(expected._id.toHexString());
  expect(received.mutableProp).toEqual(expected.mutableProp);
  expect(received.createdAt?.toISOString()).toEqual(
    expected.createdAt?.toISOString(),
  );
  if (!isUpdate) {
    expect(received.updatedAt.toISOString()).toEqual(
      expected.updatedAt.toISOString(),
    );
  }
};
