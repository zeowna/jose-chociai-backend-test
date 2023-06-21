import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompaniesModule } from './companies/companies.module';
import { CompanyUnitsModule } from './units/company-units.module';
import { CompaniesConsumerModule } from './consumers/companies-consumer.module';
import { ZeownaAuthModule } from '@zeowna/auth';
import { jwtConstants } from '@zeowna/auth/constants';
import { ZeownaLoggerModule } from '@zeowna/logger';
import { APP_INTERCEPTOR } from '@nestjs/core';
import {
  GenerateCorrelationIdInterceptor,
  PresentAbstractEntityInterceptor,
} from '@zeowna/common';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    ZeownaLoggerModule.register({
      global: true,
    }),
    ZeownaAuthModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
    CompaniesModule,
    CompanyUnitsModule,
    CompaniesConsumerModule,
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: PresentAbstractEntityInterceptor },
    { provide: APP_INTERCEPTOR, useClass: GenerateCorrelationIdInterceptor },
  ],
})
export class AppModule {}
