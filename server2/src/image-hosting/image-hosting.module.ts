import { DynamicModule, Module } from '@nestjs/common';
import { IMAGE_HOSTING_OPTIONS } from './image-hosting.constants';
import { ImageHostingService } from './image-hosting.service';
import { ImageHostingAsyncOpts } from './interfaces/image-hosting-async-opts.type';
import { ImageHostingOptions } from './interfaces/image-hosting-options.interface';

@Module({})
export class ImageHostingModule {
  static forRoot(options: ImageHostingOptions): DynamicModule {
    return {
      module: ImageHostingModule,
      global: true,
      providers: [{ provide: IMAGE_HOSTING_OPTIONS, useValue: options }],
      exports: [IMAGE_HOSTING_OPTIONS],
    };
  }

  static forRootAsync(opts: ImageHostingAsyncOpts): DynamicModule {
    return {
      imports: opts.imports,
      module: ImageHostingModule,
      global: true,
      providers: [
        {
          provide: IMAGE_HOSTING_OPTIONS,
          useFactory: opts.useFactory,
          inject: opts.inject,
        },
      ],
      exports: [IMAGE_HOSTING_OPTIONS],
    };
  }

  static forFeature(): DynamicModule {
    return {
      module: ImageHostingModule,
      providers: [ImageHostingService],
      exports: [ImageHostingService],
    };
  }
}
