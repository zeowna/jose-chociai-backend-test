import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CompaniesModule } from './companies/companies.module';
import { AssetsModule } from './assets/assets.module';
import { UnitsModule } from './units/units.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://db/tractian'),
    UsersModule,
    AuthModule,
    CompaniesModule,
    UnitsModule,
    AssetsModule,
  ],
})
export class AppModule {}
