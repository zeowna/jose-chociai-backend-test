import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractMongooseEntity } from '@zeowna/mongoose';
import {
  CompanyUnit,
  CompanyUnitDocument,
  CompanyUnitSchema,
} from '../../units/entities/company-unit.entity';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({ timestamps: true })
export class Company extends AbstractMongooseEntity {
  constructor(document: CompanyDocument) {
    super(document);
    this.name = document.name;
    this.cnpj = document.cnpj;
    this.units = (document?.units ?? []).map(
      (unitDocument) => new CompanyUnit(unitDocument as CompanyUnitDocument),
    );
  }

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  cnpj: string;

  @Prop({ type: [CompanyUnitSchema] })
  units?: CompanyUnit[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);
