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
import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true })
  description: string;

  @ApiProperty()
  @Prop({ required: true })
  model: string;

  @ApiProperty()
  @Prop({ type: AssetCompanySchema })
  owner: AssetCompany;

  @ApiProperty()
  @Prop({ type: AssetUnitSchema })
  unit: AssetUnit;

  @ApiProperty()
  @Prop({
    type: String,
    enum: Object.values(AssetStatusEnum),
    default: AssetStatusEnum.Running,
  })
  status: AssetStatusEnum;

  /**
   * Percentage float goes 0.0 to 1.0
   */
  @ApiProperty()
  @Prop({
    max: 1,
    min: 0,
    default: 1,
  })
  healthLevel: number;

  /**
   * TODO: Implement "upload"
   */
  @ApiProperty()
  @Prop()
  image?: string;

  present(): this {
    return {
      ...super.present(),
      owner: this?.owner?.present(),
      unit: this?.unit?.present(),
    };
  }
}

export const AssetSchema = SchemaFactory.createForClass(Asset);
