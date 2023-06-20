import { Injectable } from '@nestjs/common';
import { PlainAssetInterface } from '@zeowna/entities-definition';
import { KafkaContext } from '@nestjs/microservices';
import { AlertNotificationsService } from './alert-notifications.service';
import { NestLoggerService } from '@zeowna/logger';

@Injectable()
export class AlertsService {
  constructor(
    private readonly notificationService: AlertNotificationsService,
    private readonly logger: NestLoggerService,
  ) {}

  async assetHealthLevelUpdated(
    asset: PlainAssetInterface,
    context: KafkaContext,
  ) {
    const topic = context.getTopic();

    try {
      this.logger.log(topic, asset, 'started');

      await this.notificationService.send(
        `${asset.unit.id} - ${asset.unit.name} | ${asset.id} - ${
          asset.status
        } - ${asset.name} - ${asset.model}: Health Level ${
          asset.healthLevel * 100
        }`,
        asset.owner.id as string,
      );
      this.logger.log(topic, asset, 'completed');
    } catch (err) {
      this.logger.error(topic, asset, 'error', err);
    }
  }
}
