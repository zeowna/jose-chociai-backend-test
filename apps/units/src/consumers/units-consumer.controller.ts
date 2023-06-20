import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { PlainCompany } from '@zeowna/entities-definition';
import { UnitsConsumersService } from './units-consumers.service';
import { TopicsEnum } from '@zeowna/kafka';

@Controller()
export class UnitsConsumerController {
  constructor(private readonly consumersService: UnitsConsumersService) {}

  @MessagePattern(TopicsEnum.CompanyCreated)
  async companyCreatedConsumer(
    @Payload() message: PlainCompany,
    @Ctx() context: KafkaContext,
  ) {
    await this.consumersService.companyCreatedConsumer(message, context);
  }

  @MessagePattern(TopicsEnum.CompanyUpdated)
  async companyUpdatedConsumer(
    @Payload() message: PlainCompany,
    @Ctx() context: KafkaContext,
  ) {
    await this.consumersService.companyUpdatedConsumer(message, context);
  }
}
