import { ModuleMetadata } from '@nestjs/common';

export interface ISSGOptions {
  rebuildEndpoint: string;
}

export type ISSGModuleAsyncOpts = {
  useFactory?: (...args: any[]) => Promise<ISSGOptions> | ISSGOptions;
  inject?: any[];
} & Pick<ModuleMetadata, 'imports'>;
