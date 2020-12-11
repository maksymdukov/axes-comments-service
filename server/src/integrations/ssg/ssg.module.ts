import { DynamicModule, HttpModule, Module } from '@nestjs/common';
import {
  ISSGModuleAsyncOpts,
  ISSGOptions,
} from './interfaces/ssg-options.interface';
import { SSG_ROOT_OPTIONS } from './interfaces/ssg.constants';
import { SsgService } from './ssg.service';

@Module({})
export class SsgModule {
  static forRootAsync(options: ISSGModuleAsyncOpts): DynamicModule {
    const optionsProvider = {
      provide: SSG_ROOT_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject,
    };
    return {
      module: SsgModule,
      global: true,
      imports: options.imports,
      providers: [optionsProvider],
      exports: [optionsProvider],
    };
  }

  static forFeature(): DynamicModule {
    return {
      module: SsgModule,
      imports: [
        HttpModule.registerAsync({
          inject: [SSG_ROOT_OPTIONS],
          useFactory: (ssgOptions: ISSGOptions) => {
            return {
              baseURL: 'https://api.vercel.com',
              headers: {
                Authorization: `Bearer ${ssgOptions.apiToken}`,
              },
            };
          },
        }),
      ],
      providers: [SsgService],
      exports: [SsgService],
    };
  }
}
