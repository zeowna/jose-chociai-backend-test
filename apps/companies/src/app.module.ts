import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompaniesModule } from './companies/companies.module';
import { CompanyUnitsModule } from './units/company-units.module';
import { CompaniesConsumerModule } from './consumers/companies-consumer.module';
import { ZeownaAuthModule } from '@zeowna/auth';
import { jwtConstants } from '@zeowna/auth/constants';
import { ZeownaLoggerModule } from '@zeowna/logger';

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
})
export class AppModule {}
