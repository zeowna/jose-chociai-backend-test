import { Injectable } from '@nestjs/common';
import { AbstractMongooseRepository } from '@zeowna/common';
import { Unit } from './entities/unit.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UnitsMongooseRepository extends AbstractMongooseRepository<Unit> {
  constructor(
    @InjectModel(Unit.name) private readonly repository: Model<Unit>,
  ) {
    super(repository);
  }
}
