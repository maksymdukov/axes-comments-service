import { DynamicModule, HttpModule, Module } from '@nestjs/common';
import {
  INovaposhtaApiModuleAsyncOpts,
  INovaposhtaApiOptions,
} from './interfaces/novaposhta-api-options.interface';
import { NOVAPOSHTA_API_OPTIONS } from './novaposhta-api.constants';
import { NovaposhtaApiService } from './novaposhta-api.service';

@Module({})
export class NovaposhtaApiModule {
  static forRootAsync(options: INovaposhtaApiModuleAsyncOpts): DynamicModule {
    const optionsProvider = {
      provide: NOVAPOSHTA_API_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject,
    };
    return {
      module: NovaposhtaApiModule,
      global: true,
      imports: options.imports,
      providers: [optionsProvider],
      exports: [optionsProvider],
    };
  }
  static forFeature(): DynamicModule {
    return {
      module: NovaposhtaApiModule,
      imports: [
        HttpModule.registerAsync({
          inject: [NOVAPOSHTA_API_OPTIONS],
          useFactory: (apiOptions: INovaposhtaApiOptions) => {
            return {
              baseURL: 'https://api.novaposhta.ua/v2.0/json/',
              data: {
                apiKey: apiOptions.apiKey,
              },
            };
          },
        }),
      ],
      providers: [NovaposhtaApiService],
      exports: [NovaposhtaApiService],
    };
  }
}
