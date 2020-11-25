import { ModuleMetadata } from '@nestjs/common';

interface IMailerAuth {
  user: string;
  pass: string;
}

export interface IMailerOptions {
  service: string;
  auth: IMailerAuth;
  getPrefix?: (subject: string) => string;
  sender?: string;
  recipient?: string;
}

export type IMailerModuleAsyncOpts = {
  useFactory?: (...args: any[]) => Promise<IMailerOptions> | IMailerOptions;
  inject?: any[];
} & Pick<ModuleMetadata, 'imports'>;
