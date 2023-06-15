import { DynamicModule, Module } from '@nestjs/common';
import {
  ConsumerConfig,
  KafkaConfig,
} from '@nestjs/microservices/external/kafka.interface';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_PRODUCER, KAFKA_SERVICE } from './injection-tokens';
import { KafkaProducer } from './kafka.producer';

@Module({})
export class ZeownaKafkaModule {
  static register(
    clientConfig: KafkaConfig,
    consumerConfig?: ConsumerConfig,
  ): DynamicModule {
    return {
      module: ZeownaKafkaModule,
      imports: [
        ClientsModule.register([
          {
            name: KAFKA_SERVICE,
            transport: Transport.KAFKA,
            options: {
              client: clientConfig,
              consumer: consumerConfig,
            },
          },
        ]),
      ],
      providers: [
        {
          provide: KAFKA_PRODUCER,
          useFactory: async (kafkaService: ClientKafka) =>
            kafkaService.connect(),
          inject: [KAFKA_SERVICE],
        },
        KafkaProducer,
      ],
      exports: [KafkaProducer],
    };
  }
}
