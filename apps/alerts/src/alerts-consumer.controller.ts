import { Controller } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { TopicsEnum } from '@zeowna/kafka';
import { PlainAsset } from '@zeowna/entities-definition';

@Controller()
export class AlertsConsumerController {
  constructor(private readonly alertsService: AlertsService) {}

  @MessagePattern(TopicsEnum.AssetHealthLevelUpdated)
  async assetHealthLevelUpdated(
    @Payload() message: PlainAsset,
    @Ctx() context: KafkaContext,
  ) {
    return this.alertsService.assetHealthLevelUpdated(message, context);
  }
}
