import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IAppConfig } from 'src/config/config.interface';

@Injectable()
export class ApiConfigService {
  private _config: IAppConfig;
  constructor(private configService: ConfigService) {
    this._config = {
      NODE_ENV: this.get('NODE_ENV'),
      server: this.get('server'),
      auth: this.get('auth'),
      db: this.get('db'),
      imageHosting: this.get('imageHosting'),
      mail: this.get('mail'),
      sms: this.get('sms'),
    };
  }

  get<T extends keyof IAppConfig>(name: T): IAppConfig[T] {
    return this.configService.get(name);
  }

  get config() {
    return this._config;
  }

  get isDev() {
    return this.get('NODE_ENV') === 'development';
  }

  get isProd() {
    return this.get('NODE_ENV') === 'production';
  }
}
