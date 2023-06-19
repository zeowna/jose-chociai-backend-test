import { Injectable } from '@nestjs/common';
import { PlainAssetInterface } from '@zeowna/entities-definition';
import { KafkaContext } from '@nestjs/microservices';
import { AlertNotificationsService } from './alert-notifications.service';

@Injectable()
export class AlertsService {
  constructor(
    private readonly notificationService: AlertNotificationsService,
  ) {}

  async assetHealthLevelUpdated(
    asset: PlainAssetInterface,
    context: KafkaContext,
  ) {
    console.log(context.getTopic(), asset);

    await this.notificationService.send(
      `${asset.unit.id} - ${asset.unit.name} | ${asset.id} - ${
        asset.status
      } - ${asset.name} - ${asset.model}: Health Level ${
        asset.healthLevel * 100
      }`,
      asset.owner.id as string,
    );
  }
}
