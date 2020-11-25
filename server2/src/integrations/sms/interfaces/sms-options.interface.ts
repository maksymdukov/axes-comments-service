import { ModuleMetadata } from '@nestjs/common';

export interface SmsOptions {
  apiKey: string;
  adminPhone: string;
}

export type ISmsModuleAsyncOpts = {
  useFactory?: (...args: any[]) => Promise<SmsOptions> | SmsOptions;
  inject?: any[];
} & Pick<ModuleMetadata, 'imports'>;
