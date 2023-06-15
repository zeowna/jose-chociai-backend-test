import { Module } from '@nestjs/common';
import { ZeownaKafkaModule } from '@zeowna/kafka';
import { MongooseModule } from '@nestjs/mongoose';
import { Unit, UnitSchema } from './entities/unit.entity';
import { UnitsController } from './units.controller';
import { UnitsService } from './units.service';
import { UnitsMongooseRepository } from './units-mongoose.repository';
import { UnitCompaniesModule } from '../companies/unit-companies.module';

@Module({
  imports: [
    ZeownaKafkaModule.register(
      { brokers: ['kafka:9092'] },
      { groupId: 'unit' },
    ),
    MongooseModule.forFeature([{ name: Unit.name, schema: UnitSchema }]),
    UnitCompaniesModule,
  ],
  controllers: [UnitsController],
  providers: [UnitsService, UnitsMongooseRepository],
  exports: [UnitsService],
})
export class UnitsModule {}
