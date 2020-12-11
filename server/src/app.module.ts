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
import { AnonymousUsersModule } from './anonymous-users/anonymous-users.module';
import { OrdersModule } from './orders/orders.module';
import { DeliveryModule } from './delivery/delivery.module';
import { MailerModule } from './integrations/mailer/mailer.module';
import { SmsModule } from './integrations/sms/sms.module';
import { PmModule } from './pm/pm.module';
import { SsgModule } from './integrations/ssg/ssg.module';
import { FrontendModule } from './frontend/frontend.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PagesModule } from './pages/pages.module';
import { MongooseModule } from '@nestjs/mongoose';
import { NovaposhtaApiModule } from './integrations/novaposhta-api/novaposhta-api.module';

const configModule = ConfigModule.forRoot({
  load: [configuration],
  ignoreEnvFile: true,
});

const serverStaticModule = ServeStaticModule.forRootAsync({
  imports: [ApiConfigModule],
  inject: [ApiConfigService],
  useFactory: async (apiConfigService: ApiConfigService) => {
    if (apiConfigService.isDev) {
      return [];
    }
    return [
      {
        rootPath: apiConfigService.config.server.feBuildPath,
        exclude: ['/api/*'],
      },
    ];
  },
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
      logging: apiConfigService.isDev ? 'all' : undefined,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: ['dist/**/*.entity.js'],
    };
  },
});

// used for delivery
const mongooseModule = MongooseModule.forRootAsync({
  imports: [ApiConfigModule],
  inject: [ApiConfigService],
  useFactory: (apiConfigModule: ApiConfigService) => ({
    uri: apiConfigModule.config.db.mongodbUri,
  }),
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

const mailerModule = MailerModule.forAsyncRoot({
  inject: [ApiConfigService],
  useFactory: (apiConfigService: ApiConfigService) => {
    const { pass, user } = apiConfigService.config.mail;
    return {
      auth: {
        user,
        pass,
      },
      service: 'gmail',
      sender: user,
      recipient: user,
    };
  },
});

const smsModule = SmsModule.forRootAsync({
  inject: [ApiConfigService],
  useFactory: (apiConfigService: ApiConfigService) => ({
    adminPhone: apiConfigService.config.sms.adminPhone,
    apiKey: apiConfigService.config.sms.apiKey,
  }),
});

const ssgModule = SsgModule.forRootAsync({
  inject: [ApiConfigService],
  useFactory: (apiConfigService: ApiConfigService) => ({
    rebuildEndpoint: apiConfigService.config.ssg.buildFrontendHook,
    apiToken: apiConfigService.config.ssg.apiToken,
    projectId: apiConfigService.config.ssg.projectId,
  }),
});

const novaposhtaApiModule = NovaposhtaApiModule.forRootAsync({
  inject: [ApiConfigService],
  useFactory: (apiConfigService: ApiConfigService) => ({
    apiKey: apiConfigService.config.np.apiKey,
  }),
});

@Module({
  imports: [
    configModule,
    serverStaticModule,
    typeOrmModule,
    mongooseModule,
    imageStorageModule,
    mailerModule,
    smsModule,
    ssgModule,
    novaposhtaApiModule,
    ImagesModule,
    UsersModule,
    AuthModule,
    ProductsModule,
    LanguageModule,
    UtilsModule,
    SlidesModule,
    ReviewSlidesModule,
    CommentsModule,
    AnonymousUsersModule,
    OrdersModule,
    DeliveryModule,
    PmModule,
    SsgModule,
    FrontendModule,
    PagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
