import { HydratedDocument } from 'mongoose';
import { AbstractMongooseEntity } from '@zeowna/mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type CompanyUnitDocument = HydratedDocument<CompanyUnit>;

@Schema()
export class CompanyUnit extends AbstractMongooseEntity {
  constructor(document: CompanyUnitDocument) {
    super(document);
    this.name = document.name;
  }

  @ApiProperty()
  @Prop()
  name?: string;
}

export const CompanyUnitSchema = SchemaFactory.createForClass(CompanyUnit);
