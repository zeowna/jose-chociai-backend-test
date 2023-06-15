import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractMongooseEntity } from '@zeowna/mongoose';
import { HydratedDocument } from 'mongoose';
import { AssetStatusEnum } from './asset-status.enum';
import {
  AssetCompany,
  AssetCompanySchema,
} from '../../companies/entities/asset-company.entity';
import {
  AssetUnit,
  AssetUnitDocument,
  AssetUnitSchema,
} from '../../units/entities/asset-unit.entity';

export type AssetDocument = HydratedDocument<Asset>;

@Schema()
export class Asset extends AbstractMongooseEntity {
  constructor(document: AssetDocument) {
    super(document);
    this.name = document.name;
    this.description = document.description;
    this.model = document.model;
    this.owner = new AssetCompany(document.owner as AssetDocument);
    this.unit = new AssetUnit(document.unit as AssetUnitDocument);
    this.status = document.status;
    this.healthLevel = document.healthLevel;
    this.image = document.image;
  }

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  model: string;

  @Prop({ type: AssetCompanySchema })
  owner: AssetCompany;

  @Prop({ type: AssetUnitSchema })
  unit: AssetUnit;

  @Prop({
    type: String,
    enum: Object.values(AssetStatusEnum),
    default: AssetStatusEnum.Running,
  })
  status: AssetStatusEnum;

  /**
   * Percentage float 0 to 1
   */
  @Prop({
    max: 1,
    min: 0,
    default: 1,
  })
  healthLevel: number;

  @Prop()
  image?: string;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);
