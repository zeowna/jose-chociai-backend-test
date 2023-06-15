import { Inject, Injectable } from '@nestjs/common';
import { KAFKA_PRODUCER } from '@zeowna/kafka/injection-tokens';
import { Producer, ProducerBatch, ProducerRecord } from 'kafkajs';

@Injectable()
export class KafkaProducer {
  constructor(
    @Inject(KAFKA_PRODUCER) private readonly kafkaProducer: Producer,
  ) {}

  async send(record: ProducerRecord) {
    return this.kafkaProducer.send(record);
  }

  async sendBatch(batch: ProducerBatch) {
    return this.kafkaProducer.sendBatch(batch);
  }
}
