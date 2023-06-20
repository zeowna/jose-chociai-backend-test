import { AbstractEntity } from '@zeowna/common/entities/abstract.entity';
import { Prop } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export abstract class AbstractMongooseEntity extends AbstractEntity {
  constructor(document: HydratedDocument<AbstractMongooseEntity>) {
    super(document);
    if (document._id) {
      this.id = document._id.toHexString();
      this._id = document._id;
    } else if (document.id) {
      this.id = document.id;
      this._id = new Types.ObjectId(document.id);
    }
  }

  _id: Types.ObjectId;

  @ApiProperty()
  @Prop()
  createdAt: Date;

  @ApiProperty()
  @Prop()
  updatedAt: Date;

  present() {
    return {
      ...super.present(),
      _id: undefined,
    };
  }
}
