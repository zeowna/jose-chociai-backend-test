import { Module } from '@nestjs/common';
import { UsersConsumersService } from './users-consumers.service';
import { UsersModule } from '../users/users.module';
import { UsersConsumerController } from './users-consumer.controller';
import { UserCompaniesModule } from '../companies/user-companies.module';

@Module({
  imports: [UsersModule, UserCompaniesModule],
  controllers: [UsersConsumerController],
  providers: [UsersConsumersService],
})
export class UsersConsumersModule {}
