import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractMongooseEntity } from '@zeowna/mongoose';
import {
  UnitCompany,
  UnitCompanyDocument,
  UnitCompanySchema,
} from '../../companies/entities/unit-company.entity';

export type UnitDocument = HydratedDocument<Unit>;

@Schema({ timestamps: true })
export class Unit extends AbstractMongooseEntity {
  constructor(document: UnitDocument) {
    super(document);
    this.name = document.name;
    this.company = new UnitCompany(document.company as UnitCompanyDocument);
  }

  @Prop()
  name: string;

  @Prop({ type: UnitCompanySchema })
  company: Partial<UnitCompany>;
}

export const UnitSchema = SchemaFactory.createForClass(Unit);
