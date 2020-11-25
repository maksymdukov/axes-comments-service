import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiConfigService } from './api-config/api-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const configService = await app.get(ApiConfigService);
  const port = configService.isDev ? 3001 : +configService.config.server.port;
  await app.listen(port);
}
bootstrap();
