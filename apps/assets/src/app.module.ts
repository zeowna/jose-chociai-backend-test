import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ZeownaAuthModule } from '@zeowna/auth';
import { jwtConstants } from '@zeowna/auth/constants';
import { AssetsModule } from './assets/assets.module';
import { AssetUnitsModule } from './units/asset-units.module';
import { AssetCompaniesModule } from './companies/asset-companies.module';
import { AssetsConsumerModule } from './consumers/assets-consumer.module';
import { ZeownaLoggerModule } from '@zeowna/logger';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    ZeownaAuthModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
    ZeownaLoggerModule.register({ global: true }),
    AssetsModule,
    AssetCompaniesModule,
    AssetUnitsModule,
    AssetsConsumerModule,
  ],
})
export class AppModule {}
