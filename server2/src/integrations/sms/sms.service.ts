import { HttpService, Inject, Injectable } from '@nestjs/common';
import { SmsOptions } from './interfaces/sms-options.interface';
import { SMS_ROOT_OPTIONS } from './sms.constancts';

@Injectable()
export class SmsService {
  constructor(
    private httpService: HttpService,
    @Inject(SMS_ROOT_OPTIONS) private options: SmsOptions,
  ) {}

  async send(recipient: string, text: string) {
    const options = new URLSearchParams({
      recipient,
      text,
    });
    return this.httpService.post(
      '/service/Message/SendSmsMessage',
      options.toString(),
    );
  }

  async sendToAdmin(text: string) {
    return this.send(this.options.adminPhone, text);
  }
}
