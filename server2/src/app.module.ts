import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfig, ImageHostingConfig } from './config/config.interface';
import { ApiConfigService } from './api-config/api-config.service';
import { ImageHostingModule } from './image-hosting/image-hosting.module';
import { ImagesModule } from './images/images.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ApiConfigModule } from './api-config/api-config.module';
import { LanguageModule } from './language/language.module';
import { UtilsModule } from './utils/utils.module';

const configModule = ConfigModule.forRoot({
  load: [configuration],
  ignoreEnvFile: true,
});

const typeOrmModule = TypeOrmModule.forRootAsync({
  imports: [ApiConfigModule],
  inject: [ApiConfigService],
  useFactory: (apiConfigService: ApiConfigService) => {
    return {
      type: 'postgres',
      url: apiConfigService.get<DbConfig>('db').databaseUrl,
      useUnifiedTopology: true,
      synchronize: apiConfigService.isDev,
      logging: 'all',
      ssl: {
        rejectUnauthorized: false,
      },
      entities: ['dist/**/*.entity.js'],
    };
  },
});

const imageHostingModule = ImageHostingModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ApiConfigService],
  useFactory: (apiConfigService: ApiConfigService) => {
    const cnf = apiConfigService.get<ImageHostingConfig>('imageHosting');
    return {
      accessToken: cnf.accessToken,
      spaceId: cnf.spaceId,
      environmentId: cnf.environmentId,
    };
  },
});

@Module({
  imports: [
    configModule,
    typeOrmModule,
    imageHostingModule,
    ImagesModule,
    UsersModule,
    AuthModule,
    ProductsModule,
    LanguageModule,
    UtilsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
