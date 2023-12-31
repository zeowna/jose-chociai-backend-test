import { Test, TestingModule } from '@nestjs/testing';
import { MockedService } from './mocked.service';
import { MockedRepository } from '@zeowna/common/repositories/mocked.repository';
import { generateMockedEntityFunction } from '@zeowna/common/entities/generate-mocked-entity.function';
import { SortParams } from '@zeowna/common';
import { ZeownaLoggerModule } from '@zeowna/logger';

describe('MockedService', () => {
  const correlationId = 'any_string';

  let mockedService: MockedService;
  let repository: MockedRepository;
  let repositoryFindAllSpy;
  let repositoryFindByIdSpy;
  let repositoryCreateSpy;
  let repositoryUpdateSpy;
  let repositoryRemoveSpy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ZeownaLoggerModule.register()],
      providers: [MockedService, MockedRepository],
    }).compile();

    mockedService = module.get<MockedService>(MockedService);
    repository = module.get<MockedRepository>(MockedRepository);

    repositoryFindAllSpy = jest.spyOn(repository, 'findAll');
    repositoryFindByIdSpy = jest.spyOn(repository, 'findById');
    repositoryCreateSpy = jest.spyOn(repository, 'create');
    repositoryUpdateSpy = jest.spyOn(repository, 'update');
    repositoryRemoveSpy = jest.spyOn(repository, 'remove');
  });

  it('should be defined', () => {
    expect(mockedService).toBeDefined();
  });

  describe('findAll', () => {
    const skip = 0;
    const limit = 10;
    const sort: SortParams = { createdAt: -1 };

    it('should be defined', () => {
      expect(mockedService.findAll).toBeDefined();
    });

    it('should resolve [] if no result were found', async () => {
      repositoryFindAllSpy.mockResolvedValueOnce([]);
      await expect(
        mockedService.findAll(skip, limit, sort, correlationId),
      ).resolves.toEqual([]);
      expect(repositoryFindAllSpy).toBeCalled();
    });

    it('should resolve MockedEntity[] if no result were found', async () => {
      await expect(
        mockedService.findAll(skip, limit, sort, correlationId),
      ).resolves.toEqual(repository.data);
      expect(repositoryFindAllSpy).toBeCalled();
    });
  });

  describe('findById', () => {
    it('should be defined', () => {
      expect(mockedService.findById).toBeDefined();
    });

    it('should reject if no result was found', async () => {
      const id = 'random_id';
      await expect(mockedService.findById(id, correlationId)).rejects.toThrow(
        `${repository.entityName} not found with id: ${id}`,
      );
      expect(repositoryFindByIdSpy).toBeCalled();
    });

    it('should resolve MockedEntity[] if no result were found', async () => {
      const id = repository.data[0].id;
      await expect(mockedService.findById(id, correlationId)).resolves.toEqual(
        repository.data[0],
      );
      expect(repositoryFindByIdSpy).toBeCalled();
    });
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(mockedService.create).toBeDefined();
    });

    it('should resolve the created MockedEntity', async () => {
      const entity = generateMockedEntityFunction();
      await expect(
        mockedService.create(entity, correlationId),
      ).resolves.toEqual(entity);
    });
  });

  describe('update', () => {
    it('should be defined', () => {
      expect(mockedService.update).toBeDefined();
    });

    it("should reject if entities doesn't exists", async () => {
      const entity = generateMockedEntityFunction('random_id');
      await expect(
        mockedService.update(entity.id, entity, correlationId),
      ).rejects.toThrow(
        `${repository.entityName} not found with id: ${entity.id}`,
      );
    });

    it('should resolve the updated MockedEntity', async () => {
      const entity = generateMockedEntityFunction('10');
      await expect(
        mockedService.update(entity.id, entity, correlationId),
      ).resolves.toEqual(entity);
    });
  });

  describe('remove', () => {
    it('should be defined', () => {
      expect(mockedService.remove).toBeDefined();
    });

    it("should reject if entities doesn't exists", async () => {
      const entity = generateMockedEntityFunction('random_id');
      await expect(
        mockedService.remove(entity.id, correlationId),
      ).rejects.toThrow(
        `${repository.entityName} not found with id: ${entity.id}`,
      );
    });

    it('should resolve the removed MockedEntity', async () => {
      const entity = repository.data[7];
      await expect(
        mockedService.remove(entity.id, correlationId),
      ).resolves.toEqual(entity);
      expect(repositoryRemoveSpy).toBeCalled();
    });
  });

  describe('createOrUpdate', () => {
    it('should be defined', () => {
      expect(mockedService.createOrUpdate).toBeDefined();
    });

    it('should resolve a created MockedEntity', async () => {
      const entity = generateMockedEntityFunction('random_id');
      await expect(
        mockedService.createOrUpdate(entity, correlationId),
      ).resolves.toEqual(entity);
      expect(repositoryUpdateSpy).toBeCalled();
      expect(repositoryCreateSpy).toBeCalled();
    });

    it('should resolve a updated MockedEntity', async () => {
      const entity = repository.data[4];
      await expect(
        mockedService.createOrUpdate(entity, correlationId),
      ).resolves.toEqual(entity);
      expect(repositoryUpdateSpy).toBeCalled();
      expect(repositoryCreateSpy).toBeCalledTimes(0);
    });
  });
});
