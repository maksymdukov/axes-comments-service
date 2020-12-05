import { DynamicModule, HttpModule, Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import {
  ISmsModuleAsyncOpts,
  SmsOptions,
} from './interfaces/sms-options.interface';
import { SMS_ROOT_OPTIONS } from './sms.constancts';

@Module({})
export class SmsModule {
  static forRootAsync(options: ISmsModuleAsyncOpts): DynamicModule {
    options.imports ??= [];
    const optionsProvider = {
      provide: SMS_ROOT_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject,
    };
    return {
      module: SmsModule,
      global: true,
      imports: options.imports,
      providers: [optionsProvider],
      exports: [optionsProvider],
    };
  }
  static forFeature(): DynamicModule {
    return {
      module: SmsModule,
      imports: [
        HttpModule.registerAsync({
          inject: [SMS_ROOT_OPTIONS],
          useFactory: (smsOptions: SmsOptions) => {
            return {
              baseURL: 'https://api.mobizon.ua',
              headers: { 'content-type': 'application/x-www-form-urlencoded' },
              params: {
                output: 'json',
                api: 'v1',
                apiKey: smsOptions.apiKey,
              },
            };
          },
        }),
      ],
      providers: [SmsService],
      exports: [SmsService],
    };
  }
}
