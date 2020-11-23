import { ModuleMetadata } from '@nestjs/common';
import { IImageStorageOptions } from './image-hosting-options.interface';

export type IImageStorageAsyncOpts = {
  useFactory?: (
    ...args: any[]
  ) => Promise<IImageStorageOptions> | IImageStorageOptions;
  inject?: any[];
} & Pick<ModuleMetadata, 'imports'>;
