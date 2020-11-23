import { DynamicModule, Module } from '@nestjs/common';
import { IMAGE_HOSTING_OPTIONS } from './image-storage.constants';
import { ImageStorageService } from './image-storage.service';
import { IImageStorageAsyncOpts } from './interfaces/image-hosting-async-opts.type';
import { IImageStorageOptions } from './interfaces/image-hosting-options.interface';

@Module({})
export class ImageStorageModule {
  static forRoot(options: IImageStorageOptions): DynamicModule {
    return {
      module: ImageStorageModule,
      global: true,
      providers: [{ provide: IMAGE_HOSTING_OPTIONS, useValue: options }],
      exports: [IMAGE_HOSTING_OPTIONS],
    };
  }

  static forRootAsync(opts: IImageStorageAsyncOpts): DynamicModule {
    return {
      imports: opts.imports,
      module: ImageStorageModule,
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
      module: ImageStorageModule,
      providers: [ImageStorageService],
      exports: [ImageStorageService],
    };
  }
}
