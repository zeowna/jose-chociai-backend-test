import { AbstractMongooseEntity } from './abstract-mongoose.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MockedMongooseEntityDocument =
  HydratedDocument<MockedMongooseEntity>;

@Schema({ timestamps: true })
export class MockedMongooseEntity extends AbstractMongooseEntity {
  @Prop()
  mutableProp: string;
}

export const MockedMongooseEntitySchema =
  SchemaFactory.createForClass(MockedMongooseEntity);
