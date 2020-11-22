import { PaginationDto } from 'src/utils/pagination/pagination.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Product } from './product.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async findProducts(paginationDto: PaginationDto) {
    const { skip, limit } = paginationDto;

    return this.createQueryBuilder('products')
      .leftJoinAndSelect('products.languages', 'productlanguages')
      .leftJoinAndSelect('products.images', 'images')
      .innerJoinAndSelect('productlanguages.language', 'lang')
      .leftJoinAndSelect('images.languages', 'imagelanguage')
      .innerJoinAndSelect('imagelanguage.language', 'imglang')
      .take(limit)
      .skip(skip)
      .getManyAndCount();
  }
}
