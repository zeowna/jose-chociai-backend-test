import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractMongooseEntity } from '@zeowna/common';

export type AssetUnitDocument = HydratedDocument<AssetUnit>;

@Schema()
export class AssetUnit extends AbstractMongooseEntity {
  @Prop()
  name: string;
}

export const AssetUnitSchema = SchemaFactory.createForClass(AssetUnit);
