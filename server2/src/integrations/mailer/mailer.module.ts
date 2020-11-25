import { DynamicModule, Module } from '@nestjs/common';
import { ROOT_MAILER_OPTIONS } from './mailer.constants';
import { MailerService } from './mailer.service';
import { IMailerModuleAsyncOpts } from './interfaces/mailer-options.interface';
import { TemplateRendererModule } from '../template-renderer/template-renderer.module';
import { ITemplateRendererOptions } from '../template-renderer/interfaces/template-renderer-options.interface';

@Module({})
export class MailerModule {
  static forAsyncRoot(opts: IMailerModuleAsyncOpts): DynamicModule {
    return {
      module: MailerModule,
      global: true,
      providers: [
        {
          provide: ROOT_MAILER_OPTIONS,
          useFactory: opts.useFactory,
          inject: opts.inject,
        },
      ],
    };
  }

  static forFeature(opts: ITemplateRendererOptions): DynamicModule {
    return {
      module: MailerModule,
      imports: [TemplateRendererModule.register(opts)],
      providers: [MailerService],
      exports: [MailerService],
    };
  }
}
