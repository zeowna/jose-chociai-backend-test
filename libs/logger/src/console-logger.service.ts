import { Injectable } from '@nestjs/common';
import { LoggerInterface } from '@zeowna/logger/logger.interface';

@Injectable()
export class ConsoleLoggerService implements LoggerInterface {
  error(message: string, ...args: any[]) {
    console.error(message, ...args);
  }

  info(message: string, ...args: any[]) {
    console.info(message, ...args);
  }

  log(message: string, ...args: any[]) {
    console.log(message, ...args);
  }

  warn(message: string, ...args: any[]) {
    console.warn(message, ...args);
  }
}
