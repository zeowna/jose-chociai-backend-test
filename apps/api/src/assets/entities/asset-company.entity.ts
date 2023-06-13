import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractMongooseEntity } from '@zeowna/common';
import { HydratedDocument } from 'mongoose';
import { AssetDocument } from './asset.entity';

export type AssetCompanyDocument = HydratedDocument<AssetDocument>;

/**
 * Asset Company Class
 *
 * Minified version of a Company Entity
 */
@Schema()
export class AssetCompany extends AbstractMongooseEntity {
  @Prop()
  name: string;
}

export const AssetCompanySchema = SchemaFactory.createForClass(AssetCompany);
