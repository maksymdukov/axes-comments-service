import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageRepository } from 'src/images/image.repository';
import { ImagesModule } from '../images/images.module';
import { ProductRepository } from './product.repository';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductLanguageRepository } from './product-language.repository';
import { LanguageModule } from 'src/language/language.module';

@Module({
  imports: [
    ImagesModule,
    TypeOrmModule.forFeature([
      ProductRepository,
      ImageRepository,
      ProductLanguageRepository,
    ]),
    LanguageModule,
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
