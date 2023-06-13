import { AbstractMongooseEntity } from '@zeowna/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserCompany, UserCompanySchema } from './user-company.entity';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends AbstractMongooseEntity {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: UserCompanySchema })
  company: UserCompany;
}

export const UserSchema = SchemaFactory.createForClass(User);
