import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get<T = any>(name: string) {
    return this.configService.get<T>(name);
  }

  get isDev() {
    return this.get<string>('NODE_ENV') === 'development';
  }

  get isProd() {
    return this.get<string>('NODE_ENV') === 'production';
  }
}
