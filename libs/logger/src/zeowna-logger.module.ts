import { DynamicModule, Module } from '@nestjs/common';
import { NestLoggerService } from '@zeowna/logger/nest-logger.service';
import { ConsoleLoggerService } from '@zeowna/logger/console-logger.service';

export interface ZeownaLoggerOptions {
  global?: boolean;
}

@Module({})
export class ZeownaLoggerModule {
  static register(options: ZeownaLoggerOptions): DynamicModule {
    return {
      module: ZeownaLoggerModule,
      providers: [NestLoggerService, ConsoleLoggerService],
      exports: [NestLoggerService, ConsoleLoggerService],
      global: options.global,
    };
  }
}
