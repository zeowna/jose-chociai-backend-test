import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { PlainUnitInterface } from '@zeowna/entities-definition';
import { TopicsEnum } from '@zeowna/kafka';
import { CompaniesConsumerService } from './companies-consumer.service';

@Controller()
export class CompaniesConsumerController {
  constructor(private readonly consumersService: CompaniesConsumerService) {}

  @MessagePattern(TopicsEnum.UnitCreated)
  async unitCreatedConsumer(
    @Payload() message: PlainUnitInterface,
    @Ctx() context: KafkaContext,
  ) {
    await this.consumersService.unitCreatedConsumer(message, context);
  }

  @MessagePattern(TopicsEnum.UnitUpdated)
  async unitUpdatedConsumer(
    @Payload() message: PlainUnitInterface,
    @Ctx() context: KafkaContext,
  ) {
    await this.consumersService.unitUpdatedConsumer(message, context);
  }
}
