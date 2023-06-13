import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserMongooseRepository } from './user-mongoose.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user';
import { IsUserEmailAlreadyInUse } from './dto/is-user-email-already-in-use.validation';
import { HashModule } from '../hash/hash.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    HashModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UserMongooseRepository, IsUserEmailAlreadyInUse],
  exports: [UsersService],
})
export class UsersModule {}
