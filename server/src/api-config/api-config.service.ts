import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IAppConfig } from 'src/config/config.interface';
import * as path from 'path';

@Injectable()
export class ApiConfigService {
  private _config: IAppConfig;
  constructor(private configService: ConfigService) {
    this._config = {
      NODE_ENV: this.get('NODE_ENV'),
      server: {
        ...this.get('server'),
        feBuildPath: path.join(__dirname, '..', '..', '..', 'client', 'build'),
      },
      auth: this.get('auth'),
      db: this.get('db'),
      imageHosting: this.get('imageHosting'),
      mail: this.get('mail'),
      sms: this.get('sms'),
      ssg: this.get('ssg'),
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
