import { Injectable } from '@nestjs/common';
import { AbstractMongooseRepository } from '@zeowna/common';
import { User } from './entities/user';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserMongooseRepository extends AbstractMongooseRepository<User> {
  constructor(
    @InjectModel(User.name) private readonly repository: Model<User>,
  ) {
    super(repository);
  }

  async findByEmail(email: string) {
    return this.repository.findOne({ email }).exec();
  }
}
