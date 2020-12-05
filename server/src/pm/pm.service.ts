import { Injectable } from '@nestjs/common';
import { MailerService } from 'src/integrations/mailer/mailer.service';
import { SendPmDto } from './dto/send-pm.dto';

@Injectable()
export class PmService {
  constructor(private mailerService: MailerService) {}

  async sendPm(sendPmDto: SendPmDto) {
    return this.mailerService.sendToAdmin({
      subject: 'Новое сообщение',
      templatePath: 'personal-message.ejs',
      templateData: sendPmDto,
    });
  }
}
