import { Injectable } from '@nestjs/common';
import { AbstractMongooseRepository } from './abstract-mongoose.repository';
import { MockedMongooseEntity } from '../entities/mocked-mongoose.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MockedMongooseRepository extends AbstractMongooseRepository<MockedMongooseEntity> {
  constructor(
    @InjectModel(MockedMongooseEntity.name)
    private readonly mongooseRepository: Model<MockedMongooseEntity>,
  ) {
    super(mongooseRepository, MockedMongooseEntity);
  }
}
