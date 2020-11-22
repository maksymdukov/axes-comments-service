import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'src/config/config.interface';

@Injectable()
export class ApiConfigService {
  private _config: AppConfig;
  constructor(private configService: ConfigService) {
    this._config = {
      auth: this.get<AppConfig['auth']>('auth'),
      db: this.get<AppConfig['db']>('db'),
      imageHosting: this.get<AppConfig['imageHosting']>('imageHosting'),
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
