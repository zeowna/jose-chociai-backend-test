import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ZeownaAuthModule } from '@zeowna/auth';
import { jwtConstants } from '@zeowna/auth/constants';
import { UnitsModule } from './units/units.module';
import { UnitCompaniesModule } from './companies/unit-companies.module';
import { UnitsConsumerModule } from './consumers/units-consumer.module';
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
    ZeownaAuthModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
    UnitsModule,
    UnitCompaniesModule,
    UnitsConsumerModule,
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: PresentAbstractEntityInterceptor },
    { provide: APP_INTERCEPTOR, useClass: GenerateCorrelationIdInterceptor },
  ],
})
export class AppModule {}
