import { User, UserDocument } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import mongoose from 'mongoose';

export const assertUser = (
  received: User,
  expected: User,
  isUpdate = false,
) => {
  expect(received.id).toEqual(expected.id);
  expect(received.email).toEqual(expected.email);
  expect(received.company?.id).toEqual(expected.company?.id);
  expect(received.createdAt.toISOString()).toEqual(
    expected.createdAt.toISOString(),
  );
  if (!isUpdate) {
    expect(received.updatedAt.toISOString()).toEqual(
      expected.updatedAt.toISOString(),
    );
  }
};

export const generateCreateUserDto = (user: Partial<User> = {}) =>
  ({
    ...user,
    password: 'any_string',
    companyId: user.company.id,
  } as CreateUserDto);

export const generateUser = (props: Partial<User> = {}) => {
  const companyId = new mongoose.Types.ObjectId();
  return new User({
    name: 'any_string',
    cpf: 'any_string',
    email: 'any@email.com',
    password: 'any_string',
    company: { _id: companyId, id: companyId.toHexString() },
    createdAt: new Date(),
    updatedAt: new Date(),
    id: props?.id,
    _id: props?.id ? new mongoose.Types.ObjectId(props?.id) : undefined,
    ...props,
  } as UserDocument);
};
