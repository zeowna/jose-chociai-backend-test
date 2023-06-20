import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractMongooseEntity } from '@zeowna/mongoose';
import {
  CompanyUnit,
  CompanyUnitDocument,
  CompanyUnitSchema,
} from '../../units/entities/company-unit.entity';
import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  cnpj: string;

  /**
   * Subset Pattern
   * Only 10 last created/updated Units for this Company
   */
  @ApiProperty({ type: [CompanyUnit] })
  @Prop({ type: [CompanyUnitSchema] })
  units?: CompanyUnit[];

  present(): this {
    return {
      ...super.present(),
      units: this?.units?.map((unit) => unit.present()),
    };
  }
}

export const CompanySchema = SchemaFactory.createForClass(Company);
