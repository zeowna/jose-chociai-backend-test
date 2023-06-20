import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { PlainCompany, PlainUnitInterface } from '@zeowna/entities-definition';
import { TopicsEnum } from '@zeowna/kafka';
import { AssetsConsumersService } from './assets-consumers.service';

@Controller()
export class AssetsConsumerController {
  constructor(private readonly consumerService: AssetsConsumersService) {}

  @MessagePattern(TopicsEnum.CompanyCreated)
  async companyCreatedConsumer(
    @Payload() message: PlainCompany,
    @Ctx() context: KafkaContext,
  ) {
    await this.consumerService.companyCreatedConsumer(message, context);
  }

  @MessagePattern(TopicsEnum.CompanyUpdated)
  async companyUpdatedConsumer(
    @Payload() message: PlainCompany,
    @Ctx() context: KafkaContext,
  ) {
    await this.consumerService.companyUpdateConsumer(message, context);
  }

  @MessagePattern(TopicsEnum.UnitCreated)
  async unitCreatedConsumer(
    @Payload() message: PlainUnitInterface,
    @Ctx() context: KafkaContext,
  ) {
    await this.consumerService.unitCreatedConsumer(message, context);
  }

  @MessagePattern(TopicsEnum.UnitUpdated)
  async unitUpdatedConsumer(
    @Payload() message: PlainUnitInterface,
    @Ctx() context: KafkaContext,
  ) {
    await this.consumerService.unitUpdatedConsumer(message, context);
  }
}
