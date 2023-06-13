import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractMongooseEntity } from '@zeowna/common';

export type UserCompanyDocument = HydratedDocument<UserCompany>;

@Schema()
export class UserCompany extends AbstractMongooseEntity {
  @Prop()
  name: string;
}

export const UserCompanySchema = SchemaFactory.createForClass(UserCompany);
