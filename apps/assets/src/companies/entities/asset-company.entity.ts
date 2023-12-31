import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractMongooseEntity } from '@zeowna/mongoose';
import { HydratedDocument } from 'mongoose';
import { AssetDocument } from '../../assets/entities/asset.entity';
import { ApiProperty } from '@nestjs/swagger';

export type AssetCompanyDocument = HydratedDocument<AssetDocument>;

/**
 * Asset Company Class
 *
 * Minified version of a Company Entity
 */
@Schema()
export class AssetCompany extends AbstractMongooseEntity {
  constructor(document: AssetCompanyDocument) {
    super(document);
    this.name = document.name;
  }

  @ApiProperty()
  @Prop()
  name?: string;
}

export const AssetCompanySchema = SchemaFactory.createForClass(AssetCompany);
