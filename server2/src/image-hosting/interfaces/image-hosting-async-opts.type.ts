import { ModuleMetadata } from '@nestjs/common';
import { ImageHostingOptions } from './image-hosting-options.interface';

export type ImageHostingAsyncOpts = {
  useFactory?: (
    ...args: any[]
  ) => Promise<ImageHostingOptions> | ImageHostingOptions;
  inject?: any[];
} & Pick<ModuleMetadata, 'imports'>;
