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

    if (asset.healthLevel < 0.75) {
      await this.notificationService.send(
        `Unit ${asset.unit.id} - ${asset.unit.name} | Asset ${asset.id} - ${asset.name} - ${asset.model}: Health Level down 75% ${asset.healthLevel}`,
        asset.owner.id as string,
      );
    }
  }
}
