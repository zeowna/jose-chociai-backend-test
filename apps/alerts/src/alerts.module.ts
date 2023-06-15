import { Module } from '@nestjs/common';
import { AlertsConsumerController } from './alerts-consumer.controller';
import { AlertsService } from './alerts.service';
import { AlertNotificationsService } from './alert-notifications.service';

@Module({
  imports: [],
  controllers: [AlertsConsumerController],
  providers: [AlertsService, AlertNotificationsService],
})
export class AlertsModule {}
