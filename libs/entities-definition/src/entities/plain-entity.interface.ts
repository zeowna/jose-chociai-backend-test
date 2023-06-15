import { ID } from '@zeowna/common';

export interface PlainEntityInterface {
  readonly id: ID;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
