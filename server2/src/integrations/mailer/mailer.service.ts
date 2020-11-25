import { Inject, Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { TemplateRedererService } from '../template-renderer/template-renderer.service';
import { IMailerOptions } from './interfaces/mailer-options.interface';
import { ISendEmailOptions } from './interfaces/send-email-options.interface';
import { ROOT_MAILER_OPTIONS } from './mailer.constants';

@Injectable()
export class MailerService {
  private rootMailerOptions: IMailerOptions;
  private nodemailer: Mail;

  constructor(
    @Inject(ROOT_MAILER_OPTIONS)
    rootMailerOptions: IMailerOptions,
    private templateRenderer: TemplateRedererService,
  ) {
    rootMailerOptions.getPrefix ??= (subject: string) => subject;
    this.rootMailerOptions = rootMailerOptions;

    this.nodemailer = createTransport({
      service: this.rootMailerOptions.service,
      auth: {
        user: this.rootMailerOptions.auth.user,
        pass: this.rootMailerOptions.auth.pass,
      },
    });
  }

  async sendEmail(options: ISendEmailOptions) {
    const { templatePath, templateData, subject, from, to } = options;
    const html = await this.templateRenderer.render(templatePath, templateData);
    return this.nodemailer.sendMail({
      html,
      from: from || this.rootMailerOptions.sender,
      to: to || this.rootMailerOptions.recipient,
      subject: this.rootMailerOptions.getPrefix(subject),
    });
  }
}
