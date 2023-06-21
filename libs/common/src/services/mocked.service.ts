import { AbstractService } from '@zeowna/common/services';
import { MockedRepository } from '@zeowna/common/repositories/mocked.repository';
import { Injectable } from '@nestjs/common';
import { MockedEntity } from '@zeowna/common/entities/mocked.entity';
import { NestLoggerService } from '@zeowna/logger';

@Injectable()
export class MockedService extends AbstractService<MockedEntity> {
  constructor(
    private readonly mockedRepository: MockedRepository,
    private readonly logger: NestLoggerService,
  ) {
    super(mockedRepository, logger);
  }
}
