import { Test, TestingModule } from '@nestjs/testing';
import { AlertsConsumerController } from './alerts-consumer.controller';
import { AlertsService } from './alerts.service';

describe('AlertsController', () => {
  let alertsController: AlertsConsumerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AlertsConsumerController],
      providers: [AlertsService],
    }).compile();

    alertsController = app.get<AlertsConsumerController>(
      AlertsConsumerController,
    );
  });
});
