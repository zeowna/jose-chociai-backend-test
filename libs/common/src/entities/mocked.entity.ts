import { AbstractEntity } from '@zeowna/common';

export class MockedEntity extends AbstractEntity {
  constructor(props: Omit<MockedEntity, 'present'>) {
    super(props);
  }
}
