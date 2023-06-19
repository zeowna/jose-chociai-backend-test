import { ID, RepositoryInterface, SortParams } from '@zeowna/common';
import { Injectable } from '@nestjs/common';
import { generateMockedEntityFunction } from '@zeowna/common/entities/generate-mocked-entity.function';
import { MockedEntity } from '@zeowna/common/entities/mocked.entity';

@Injectable()
export class MockedRepository implements RepositoryInterface<MockedEntity> {
  readonly data = Array(10)
    .fill(null)
    .map((_, index) => generateMockedEntityFunction(`${index + 1}`));

  async findAll(skip: number, limit: number, sort: SortParams) {
    return this.data;
  }

  async findById(id: ID) {
    return this.data.find((item) => item.id === id);
  }

  async create(entity: MockedEntity) {
    this.data.push(entity);

    return entity;
  }

  async update(id: ID, entity: Partial<MockedEntity>) {
    const existing = await this.findById(id);

    if (!existing) {
      return null;
    }

    return new MockedEntity({ ...existing, ...entity });
  }

  async remove(id: string) {
    return this.findById(id);
  }

  async createOrUpdate(entity: MockedEntity) {
    const updated = await this.update(entity.id, entity);

    if (!updated) {
      return this.create(entity);
    }

    return updated;
  }

  get entityName() {
    return MockedEntity.name;
  }
}
