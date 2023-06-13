import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractMongooseEntity } from '@zeowna/common';
import { UnitCompany, UnitCompanySchema } from './unit-company.entity';

export type UnitDocument = HydratedDocument<Unit>;

@Schema()
export class Unit extends AbstractMongooseEntity {
  @Prop()
  name: string;

  @Prop({ type: UnitCompanySchema })
  company: Partial<UnitCompany>;
}

export const UnitSchema = SchemaFactory.createForClass(Unit);
