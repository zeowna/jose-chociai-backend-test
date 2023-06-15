import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ZeownaAuthModule } from '@zeowna/auth';
import { jwtConstants } from '@zeowna/auth/constants';
import { AssetsModule } from './assets/assets.module';
import { ZeownaKafkaModule } from '@zeowna/kafka';
import { AssetUnitsModule } from './units/asset-units.module';
import { AssetCompaniesModule } from './companies/asset-companies.module';
import { AssetsConsumerModule } from './consumers/assets-consumer.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://db/tractian'),
    ZeownaAuthModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
    ZeownaKafkaModule.register(
      { brokers: ['kafka:9092'] },
      { groupId: 'assets' },
    ),
    AssetsModule,
    AssetCompaniesModule,
    AssetUnitsModule,
    AssetsConsumerModule,
  ],
})
export class AppModule {}
