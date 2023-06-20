import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractMongooseEntity } from '@zeowna/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UnitCompanyDocument = HydratedDocument<UnitCompany>;

@Schema()
export class UnitCompany extends AbstractMongooseEntity {
  constructor(document: UnitCompanyDocument) {
    super(document);
    this.name = document.name;
  }

  @ApiProperty()
  @Prop()
  name?: string;
}

export const UnitCompanySchema = SchemaFactory.createForClass(UnitCompany);
