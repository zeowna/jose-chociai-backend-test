import { ApiProperty } from '@nestjs/swagger';

export type ID = string | number;

export abstract class AbstractEntity {
  @ApiProperty()
  id: ID;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  constructor(props: Omit<AbstractEntity, 'present'>) {
    this.id = props.id;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  present() {
    return this;
  }
}
