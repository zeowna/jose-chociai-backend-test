import { AbstractService } from '@zeowna/common/services/index';
import { MockedRepository } from '@zeowna/common/repositories/mocked.repository';
import { Injectable } from '@nestjs/common';
import { MockedEntity } from '@zeowna/common/entities/mocked.entity';

@Injectable()
export class MockedService extends AbstractService<MockedEntity> {
  constructor(private readonly mockedResolver: MockedRepository) {
    super(mockedResolver);
  }
}
