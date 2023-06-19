import { AbstractEntity } from '@zeowna/common/entities/abstract.entity';
import { Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export abstract class AbstractMongooseEntity extends AbstractEntity {
  constructor(document: HydratedDocument<AbstractMongooseEntity>) {
    super(document);
    this._id = document._id ?? new mongoose.Types.ObjectId(document.id);
    this.id = this._id.toHexString();
  }

  _id?: any;

  @ApiProperty()
  @Prop()
  createdAt: Date;

  @ApiProperty()
  @Prop()
  updatedAt: Date;

  present(): this {
    return {
      ...super.present(),
      _id: undefined,
    };
  }
}
