import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractMongooseEntity } from '@zeowna/common';

export type UnitCompanyDocument = HydratedDocument<UnitCompany>;

@Schema()
export class UnitCompany extends AbstractMongooseEntity {
  @Prop()
  name?: string;
}

export const UnitCompanySchema = SchemaFactory.createForClass(UnitCompany);
