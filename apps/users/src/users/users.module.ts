import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserMongooseRepository } from './user-mongoose.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { IsUserEmailAlreadyInUse } from './dto/is-user-email-already-in-use.validation';
import { HashModule } from '../hash/hash.module';
import { UserCompaniesModule } from '../companies/user-companies.module';
import { IsUserCpfAlreadyInUse } from './dto/is-user-cpf-already-in-use.validation';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    HashModule,
    UserCompaniesModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserMongooseRepository,
    IsUserEmailAlreadyInUse,
    IsUserCpfAlreadyInUse,
  ],
  exports: [UsersService],
})
export class UsersModule {}
