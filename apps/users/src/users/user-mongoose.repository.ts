import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlainCompany } from '@zeowna/entities-definition';
import { AbstractMongooseRepository } from '@zeowna/mongoose';

@Injectable()
export class UserMongooseRepository extends AbstractMongooseRepository<User> {
  constructor(
    @InjectModel(User.name) private readonly repository: Model<User>,
  ) {
    super(repository, User);
  }

  async findByCpf(cpf: string) {
    const found = await this.repository.findOne({ cpf }).lean().exec();

    if (!found) {
      return null;
    }

    return new User(found as UserDocument);
  }

  async findByEmail(email: string) {
    const found = await this.repository.findOne({ email }).lean().exec();

    if (!found) {
      return null;
    }

    return new User(found as UserDocument);
  }

  async updatePassword(id: string, password: string) {
    const updated = await this.repository
      .findByIdAndUpdate(id, { password }, { new: true })
      .lean()
      .exec();

    if (!updated) {
      return null;
    }

    return new User(updated as UserDocument);
  }

  async updateUserCompany(company: PlainCompany) {
    await this.repository
      .updateMany({ 'company._id': company.id }, { company: company })
      .lean()
      .exec();
  }
}
