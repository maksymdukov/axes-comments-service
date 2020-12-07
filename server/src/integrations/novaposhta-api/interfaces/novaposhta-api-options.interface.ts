import { ModuleMetadata } from '@nestjs/common';

export interface INovaposhtaApiOptions {
  apiKey: string;
}

export type INovaposhtaApiModuleAsyncOpts = {
  useFactory?: (
    ...args: any[]
  ) => Promise<INovaposhtaApiOptions> | INovaposhtaApiOptions;
  inject?: any[];
} & Pick<ModuleMetadata, 'imports'>;
