import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ZeownaAuthModule } from '@zeowna/auth';
import { jwtConstants } from '@zeowna/auth/constants';
import { UnitsModule } from './units/units.module';
import { UnitCompaniesModule } from './companies/unit-companies.module';
import { UnitsConsumerModule } from './consumers/units-consumer.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://db/tractian'),
    ZeownaAuthModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
    UnitsModule,
    UnitCompaniesModule,
    UnitsConsumerModule,
  ],
})
export class AppModule {}
