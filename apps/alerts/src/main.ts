import { NestFactory } from '@nestjs/core';
import { AlertsModule } from './alerts.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AlertsModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: { brokers: ['kafka:9092'] },
      consumer: { groupId: 'alerts' },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();
