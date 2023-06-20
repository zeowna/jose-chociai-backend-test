import { Test, TestingModule } from '@nestjs/testing';
import { MockedMongooseRepository } from './mocked-mongoose.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MockedMongooseEntity,
  MockedMongooseEntityDocument,
  MockedMongooseEntitySchema,
} from '../entities/mocked-mongoose.entity';
import * as mongoose from 'mongoose';
import { disconnect } from 'mongoose';
import { MockedMongooseFactory } from './mocked-mongoose.module';
import {
  assertMockedMongooseEntity,
  generateMockedMongooseEntity,
} from '@zeowna/mongoose/repositories/test';

const MockedMongooseModule = MockedMongooseFactory.useMongoMemoryServer();

describe('MockedMongooseRepository', () => {
  let repository: MockedMongooseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MockedMongooseModule.register(),
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
    await disconnect();
    await MockedMongooseModule.disconnect();
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
      const first = await repository.create(generateMockedMongooseEntity());
      const second = await repository.create(generateMockedMongooseEntity());
      const third = await repository.create(generateMockedMongooseEntity());

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
        generateMockedMongooseEntity({ id }),
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
      const created = generateMockedMongooseEntity({
        id: new mongoose.Types.ObjectId().toHexString(),
      });
      const result = await repository.create(created);
      const expected = generateMockedMongooseEntity({
        ...created,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      } as MockedMongooseEntityDocument);

      assertMockedMongooseEntity(result, expected);
    });
  });

  describe('update()', () => {
    it('should be defined', () => {
      expect(repository.update).toBeDefined();
    });

    it("should reject if entity doesn't exists", async () => {
      const updated = generateMockedMongooseEntity();

      const found = null;
      await expect(repository.update(updated.id, updated)).resolves.toEqual(
        found,
      );
    });

    it('should resolve the updated MockedEntity', async () => {
      const created = await repository.create(generateMockedMongooseEntity());

      const updated = new MockedMongooseEntity({
        ...created,
        mutableProp: 'another_string',
      } as MockedMongooseEntityDocument);

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
        generateMockedMongooseEntity({ id }),
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
      const created = generateMockedMongooseEntity({
        id: new mongoose.Types.ObjectId().toHexString(),
      });
      const result = await repository.createOrUpdate(created);

      assertMockedMongooseEntity(result, created);
    });

    it('should resolve a updated MockedEntity', async () => {
      const existing = await repository.create(generateMockedMongooseEntity());
      const updated = generateMockedMongooseEntity({
        ...existing,
        mutableProp: 'another_string',
      });

      const result = await repository.createOrUpdate(updated);
      assertMockedMongooseEntity(result, updated, true);
    });
  });
});
