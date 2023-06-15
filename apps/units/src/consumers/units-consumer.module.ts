import { Module } from '@nestjs/common';
import { UnitsConsumerController } from './units-consumer.controller';
import { UnitsModule } from '../units/units.module';
import { UnitsConsumersService } from './units-consumers.service';
import { UnitCompaniesModule } from '../companies/unit-companies.module';

@Module({
  imports: [UnitsModule, UnitCompaniesModule],
  controllers: [UnitsConsumerController],
  providers: [UnitsConsumersService],
})
export class UnitsConsumerModule {}
