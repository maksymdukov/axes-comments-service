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
    const observable = this.httpService.post(
      '/service/Message/SendSmsMessage',
      options.toString(),
    );
    return observable.toPromise();
  }

  async sendToAdmin(text: string) {
    return this.send(this.options.adminPhone, text);
  }
}
