import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractMongooseEntity } from '@zeowna/common';
import { Unit, UnitSchema } from '../../units/entities/unit.entity';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({ timestamps: true })
export class Company extends AbstractMongooseEntity {
  @Prop()
  name: string;

  @Prop({ type: [UnitSchema] })
  units: Unit[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);
