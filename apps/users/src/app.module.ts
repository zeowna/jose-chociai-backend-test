import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersConsumersModule } from './consumers/users-consumers.module';
import { UserCompaniesModule } from './companies/user-companies.module';
import { ZeownaLoggerModule } from '@zeowna/logger';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    ZeownaLoggerModule.register({ global: true }),
    UsersModule,
    AuthModule,
    UserCompaniesModule,
    UsersConsumersModule,
  ],
})
export class AppModule {}
