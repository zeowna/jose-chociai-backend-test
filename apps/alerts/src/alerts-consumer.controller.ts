import { Controller } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { TopicsEnum } from '@zeowna/kafka';
import { PlainAssetInterface } from '@zeowna/entities-definition';

@Controller()
export class AlertsConsumerController {
  constructor(private readonly alertsService: AlertsService) {}

  /**
   * @TODO: Implement Asset update Health Level update
   */
  @MessagePattern(TopicsEnum.AssetHealthLevelUpdated)
  async assetHealthLevelUpdated(
    @Payload() message: PlainAssetInterface,
    @Ctx() context: KafkaContext,
  ) {
    return this.alertsService.assetHealthLevelUpdated(message, context);
  }
}
