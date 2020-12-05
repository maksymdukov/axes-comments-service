import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageRepository } from 'src/images/image.repository';
import { ImagesModule } from '../images/images.module';
import { ProductRepository } from './product.repository';
import { ProductsService } from './products.service';
import { ProductsAdminController } from './products-admin.controller';
import { ProductLanguageRepository } from './product-language.repository';
import { LanguageModule } from 'src/language/language.module';
import { ProductsController } from './products.controller';

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
  controllers: [ProductsAdminController, ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
