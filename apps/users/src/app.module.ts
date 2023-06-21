import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersConsumersModule } from './consumers/users-consumers.module';
import { UserCompaniesModule } from './companies/user-companies.module';
import { ZeownaLoggerModule } from '@zeowna/logger';
import { APP_INTERCEPTOR } from '@nestjs/core';
import {
  GenerateCorrelationIdInterceptor,
  PresentAbstractEntityInterceptor,
} from '@zeowna/common';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    ZeownaLoggerModule.register({ global: true }),
    UsersModule,
    AuthModule,
    UserCompaniesModule,
    UsersConsumersModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: GenerateCorrelationIdInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: PresentAbstractEntityInterceptor,
    },
  ],
})
export class AppModule {}
