import { Module } from '@nestjs/common';
import { AlertsConsumerController } from './alerts-consumer.controller';
import { AlertsService } from './alerts.service';
import { AlertNotificationsService } from './alert-notifications.service';
import { ZeownaLoggerModule } from '@zeowna/logger';

@Module({
  imports: [ZeownaLoggerModule.register({ global: true })],
  controllers: [AlertsConsumerController],
  providers: [AlertsService, AlertNotificationsService],
})
export class AlertsModule {}
