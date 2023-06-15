import { Module } from '@nestjs/common';
import { UserCompaniesService } from './user-companies.service';
import { UserCompaniesMongooseRepository } from './user-companies-mongoose.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserCompany, UserCompanySchema } from './entities/user-company.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserCompany.name,
        schema: UserCompanySchema,
      },
    ]),
  ],
  providers: [UserCompaniesService, UserCompaniesMongooseRepository],
  exports: [UserCompaniesService],
})
export class UserCompaniesModule {}
