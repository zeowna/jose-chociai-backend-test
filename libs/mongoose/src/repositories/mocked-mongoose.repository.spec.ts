import { Test, TestingModule } from '@nestjs/testing';
import { MockedMongooseRepository } from './mocked-mongoose.repository';
import { generateMockedMongooseEntityFunction } from '../entities/generate-mocked-mongoose-entity.function';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MockedMongooseEntity,
  MockedMongooseEntityDocument,
  MockedMongooseEntitySchema,
} from '../entities/mocked-mongoose.entity';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import { MockedMongooseModule } from './mocked-mongoose.module';

const assertMockedMongooseEntity = (
  received: MockedMongooseEntity,
  expected: MockedMongooseEntity,
  isUpdate = false,
) => {
  expect(received._id.toHexString()).toEqual(expected._id.toHexString());
  expect(received.mutableProp).toEqual(expected.mutableProp);
  expect(received.createdAt.toISOString()).toEqual(
    expected.createdAt.toISOString(),
  );
  if (!isUpdate) {
    expect(received.updatedAt.toISOString()).toEqual(
      expected.updatedAt.toISOString(),
    );
  }
};

describe('MockedMongooseRepository', () => {
  let mongod: MongoMemoryServer;
  let repository: MockedMongooseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MockedMongooseModule(mongod),
        MongooseModule.forFeature([
          {
            name: MockedMongooseEntity.name,
            schema: MockedMongooseEntitySchema,
          },
        ]),
      ],
      providers: [MockedMongooseRepository],
    }).compile();

    repository = module.get<MockedMongooseRepository>(MockedMongooseRepository);
  });

  afterAll(async () => {
    if (mongod) {
      await mongod.stop();
    }
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findAll()', () => {
    it('should be defined', () => {
      expect(repository.findAll).toBeDefined();
    });

    it('should resolve [] if no result were found', async () => {
      const mock = [];

      await expect(
        repository.findAll(0, 10, { createdAt: -1 }),
      ).resolves.toEqual(mock);
    });

    it('should resolve MockedEntity[] if no result were found', async () => {
      const first = await repository.create(
        generateMockedMongooseEntityFunction(),
      );
      const second = await repository.create(
        generateMockedMongooseEntityFunction(),
      );
      const third = await repository.create(
        generateMockedMongooseEntityFunction(),
      );

      const [result1, result2, result3] = await repository.findAll(0, 10, {
        createdAt: 1,
      });

      assertMockedMongooseEntity(result1, first);
      assertMockedMongooseEntity(result2, second);
      assertMockedMongooseEntity(result3, third);
    });
  });

  describe('findById()', () => {
    it('should be defined', () => {
      expect(repository.findById).toBeDefined();
    });

    it('should resolve null if no result were found', async () => {
      const id = new mongoose.Types.ObjectId().toHexString();
      const found = null;
      await expect(repository.findById(id)).resolves.toEqual(found);
    });

    it('should resolve MockedEntity[] if no result were found', async () => {
      const id = new mongoose.Types.ObjectId().toHexString();
      const found = await repository.create(
        generateMockedMongooseEntityFunction({ id }),
      );
      const result = await repository.findById(id);
      assertMockedMongooseEntity(result, found);
    });
  });

  describe('create()', () => {
    it('should be defined', () => {
      expect(repository.create).toBeDefined();
    });

    it('should resolve the created MockedEntity', async () => {
      const created = generateMockedMongooseEntityFunction();
      const result = await repository.create(created);

      assertMockedMongooseEntity(
        result,
        new MockedMongooseEntity({
          ...created,
          createdAt: result.createdAt,
          updatedAt: result.updatedAt,
        } as MockedMongooseEntityDocument),
      );
    });
  });

  describe('update()', () => {
    it('should be defined', () => {
      expect(repository.update).toBeDefined();
    });

    it("should reject if entities doesn't exists", async () => {
      const updated = generateMockedMongooseEntityFunction();

      const found = null;
      await expect(repository.update(updated.id, updated)).resolves.toEqual(
        found,
      );
    });

    it('should resolve the updated MockedEntity', async () => {
      const created = await repository.create(
        generateMockedMongooseEntityFunction(),
      );

      const updated = generateMockedMongooseEntityFunction({
        ...created,
        mutableProp: 'another_string',
      });

      const result = await repository.update(created.id, updated);

      assertMockedMongooseEntity(result, updated, true);
    });
  });

  describe('remove()', () => {
    it('should be defined', () => {
      expect(repository.remove).toBeDefined();
    });

    it("should reject if entities doesn't exists", async () => {
      const id = new mongoose.Types.ObjectId().toHexString();
      const removed = null;

      await expect(repository.remove(id)).resolves.toEqual(removed);
    });

    it('should resolve the removed MockedEntity', async () => {
      const id = new mongoose.Types.ObjectId().toHexString();
      const removed = await repository.create(
        generateMockedMongooseEntityFunction({ id }),
      );

      const result = await repository.remove(id);
      assertMockedMongooseEntity(result, removed);
    });
  });

  describe('createOrUpdate()', () => {
    it('should be defined', () => {
      expect(repository.createOrUpdate).toBeDefined();
    });

    it('should resolve a created MockedEntity', async () => {
      const created = generateMockedMongooseEntityFunction();
      const result = await repository.createOrUpdate(created);

      assertMockedMongooseEntity(result, created);
    });

    it('should resolve a updated MockedEntity', async () => {
      const existing = await repository.create(
        generateMockedMongooseEntityFunction(),
      );
      const updated = generateMockedMongooseEntityFunction({
        ...existing,
        mutableProp: 'another_string',
      });
      const result = await repository.createOrUpdate(updated);
      assertMockedMongooseEntity(result, updated, true);
    });
  });
});
