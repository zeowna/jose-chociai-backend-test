import { Injectable } from '@nestjs/common';

@Injectable()
export class AlertNotificationsService {
  /**
   * @TODO: Implement notification here
   */
  async send(message: string, companyId: string) {
    console.log(`Sending Notification to ${companyId}`);
    console.log(message);
  }
}
