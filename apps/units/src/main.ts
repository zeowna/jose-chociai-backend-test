import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { PresentAbstractEntityInterceptor } from '@zeowna/common/interceptors/present-abstract-entity-interceptor.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new PresentAbstractEntityInterceptor());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

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
