import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractMongooseEntity } from '@zeowna/common';
import { HydratedDocument } from 'mongoose';
import { AssetStatusEnum } from './asset-status.enum';
import { AssetCompany, AssetCompanySchema } from './asset-company.entity';
import { AssetUnit, AssetUnitSchema } from './asset-unit.entity';

export type AssetDocument = HydratedDocument<Asset>;

@Schema()
export class Asset extends AbstractMongooseEntity {
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

  @Prop()
  image: string;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);
