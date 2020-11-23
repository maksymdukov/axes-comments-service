import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IAppConfig } from 'src/config/config.interface';

@Injectable()
export class ApiConfigService {
  private _config: IAppConfig;
  constructor(private configService: ConfigService) {
    this._config = {
      auth: this.get<IAppConfig['auth']>('auth'),
      db: this.get<IAppConfig['db']>('db'),
      imageHosting: this.get<IAppConfig['imageHosting']>('imageHosting'),
    };
  }

  get<T = any>(name: string) {
    return this.configService.get<T>(name);
  }

  get config() {
    return this._config;
  }

  get isDev() {
    return this.get<string>('NODE_ENV') === 'development';
  }

  get isProd() {
    return this.get<string>('NODE_ENV') === 'production';
  }
}
