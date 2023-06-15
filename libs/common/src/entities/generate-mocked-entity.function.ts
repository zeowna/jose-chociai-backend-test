import { MockedEntity } from './mocked.entity';

export const generateMockedEntityFunction = (id?: string): MockedEntity =>
  new MockedEntity({
    id: id ?? 'any_id',
    createdAt: new Date(),
    updatedAt: new Date(),
  });
