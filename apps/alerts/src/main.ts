import { NestFactory } from '@nestjs/core';
import { AlertsModule } from './alerts.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AlertsModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: { brokers: process.env.KAFKA_BROKERS.split(',') },
      consumer: { groupId: process.env.KAFKA_CONSUMER_GROUP_ID },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();
