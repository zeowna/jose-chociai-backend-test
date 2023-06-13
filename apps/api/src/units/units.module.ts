import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Unit, UnitSchema } from './entities/unit.entity';
import { UnitsController } from './units.controller';
import { UnitsService } from './units.service';
import { UnitsMongooseRepository } from './units-mongoose-repository.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Unit.name, schema: UnitSchema }]),
  ],
  controllers: [UnitsController],
  providers: [UnitsService, UnitsMongooseRepository],
})
export class UnitsModule {}
