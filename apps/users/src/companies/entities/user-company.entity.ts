import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractMongooseEntity } from '@zeowna/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserCompanyDocument = HydratedDocument<UserCompany>;

@Schema()
export class UserCompany extends AbstractMongooseEntity {
  constructor(document: UserCompanyDocument) {
    super(document);
    this.name = document.name;
  }

  @ApiProperty()
  @Prop()
  name?: string;
}

export const UserCompanySchema = SchemaFactory.createForClass(UserCompany);
