import { AbstractMongooseEntity } from '@zeowna/mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  UserCompany,
  UserCompanySchema,
} from '../../companies/entities/user-company.entity';
import { CompanyDocument } from '../../../../companies/src/companies/entities/company.entity';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends AbstractMongooseEntity {
  constructor(document: UserDocument) {
    super(document);
    this.name = document.name;
    this.cpf = document.cpf;
    this.email = document.email;
    this.password = document.password;
    this.company = new UserCompany(document.company as CompanyDocument);
  }

  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  cpf: string;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @ApiProperty({
    type: UserCompany,
  })
  @Prop({ type: UserCompanySchema, require: true })
  company: UserCompany;

  present(): this {
    return { ...super.present(), password: undefined };
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
