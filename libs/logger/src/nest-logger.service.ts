import { Injectable, Logger } from '@nestjs/common';
import { LoggerInterface } from '@zeowna/logger/logger.interface';

@Injectable()
export class NestLoggerService implements LoggerInterface {
  error(message: string, ...args: any[]) {
    Logger.error(message, ...args);
  }

  info(message: string, ...args: any[]) {
    Logger.verbose(message, ...args);
  }

  log(message: string, ...args: any[]) {
    Logger.log(message, ...args);
  }

  warn(message: string, ...args: any[]) {
    Logger.warn(message, ...args);
  }
}
