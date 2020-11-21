import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from '../images/image.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private producutsRepository: Repository<Product>,
    @InjectRepository(Image) private imageRepository: Repository<Image>,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    const {
      description,
      imageIds,
      longDescription,
      price,
      slug,
      title,
    } = createProductDto;
    const images = await this.imageRepository.findByIds(imageIds);
    const product = this.producutsRepository.create({
      title,
      description,
      longDescription,
      price,
      slug,
      images,
    });
    return this.producutsRepository.save(product);
  }
}
