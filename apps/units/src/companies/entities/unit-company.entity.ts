import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractMongooseEntity } from '@zeowna/mongoose';

export type UnitCompanyDocument = HydratedDocument<UnitCompany>;

@Schema()
export class UnitCompany extends AbstractMongooseEntity {
  constructor(document: UnitCompanyDocument) {
    super(document);
    this.name = document.name;
  }

  @Prop()
  name?: string;
}

export const UnitCompanySchema = SchemaFactory.createForClass(UnitCompany);
