import { Injectable } from '@nestjs/common';
import { ConsoleLoggerService } from '@zeowna/logger/console-logger.service';

@Injectable()
export class AlertNotificationsService {
  constructor(private readonly logger: ConsoleLoggerService) {}

  /**
   * @TODO: Implement Real notification here
   */
  async send(message: string, companyId: string) {
    this.logger.log(`Sending Notification to ${companyId}`);
    this.logger.log(message);
  }
}
