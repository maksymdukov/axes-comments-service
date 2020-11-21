import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '../images/image.entity';
import { ImagesModule } from '../images/images.module';
import { Product } from './product.entity';
import { ProductsService } from './products.service';

@Module({
  imports: [ImagesModule, TypeOrmModule.forFeature([Product, Image])],
  providers: [ProductsService],
})
export class ProductsModule {}
