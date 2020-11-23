import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiConfigService } from './api-config/api-config.service';
import { ImageStorageModule } from './integrations/image-storage/image-storage.module';
import { ImagesModule } from './images/images.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ApiConfigModule } from './api-config/api-config.module';
import { LanguageModule } from './language/language.module';
import { UtilsModule } from './utils/utils.module';
import { SlidesModule } from './slides/slides.module';
import { ReviewSlidesModule } from './review-slides/review-slides.module';
import { CommentsModule } from './comments/comments.module';

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
      url: apiConfigService.config.db.databaseUrl,
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

const imageStorageModule = ImageStorageModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ApiConfigService],
  useFactory: (apiConfigService: ApiConfigService) => {
    const cnf = apiConfigService.config.imageHosting;
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
    imageStorageModule,
    ImagesModule,
    UsersModule,
    AuthModule,
    ProductsModule,
    LanguageModule,
    UtilsModule,
    SlidesModule,
    ReviewSlidesModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
