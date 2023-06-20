import { ID } from '@zeowna/common';

export interface PlainEntity {
  readonly id: ID;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
