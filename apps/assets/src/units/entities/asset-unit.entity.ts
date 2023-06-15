import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractMongooseEntity } from '@zeowna/mongoose';

export type AssetUnitDocument = HydratedDocument<AssetUnit>;

@Schema()
export class AssetUnit extends AbstractMongooseEntity {
  constructor(document: AssetUnitDocument) {
    super(document);
    this.name = document.name;
    this.companyId = document.companyId;
  }

  @Prop()
  name?: string;

  @Prop()
  companyId?: string;
}

export const AssetUnitSchema = SchemaFactory.createForClass(AssetUnit);
