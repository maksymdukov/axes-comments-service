import { EntityRepository, Repository } from 'typeorm';
import { Product } from './product.entity';
import { GetProductsDto } from './dto/get-products.dto';
import { GetProductByIdDto } from './dto/get-product-by-id.dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async findProducts(getProductsDto: GetProductsDto) {
    const { skip, limit, locale, isFeatured } = getProductsDto;
    const query = this.createQueryBuilder('products')
      .leftJoinAndSelect('products.languages', 'productlanguages')
      .leftJoinAndSelect('products.images', 'images')
      .innerJoinAndSelect('productlanguages.language', 'lang')
      .leftJoinAndSelect('images.languages', 'imagelanguage')
      .innerJoinAndSelect('imagelanguage.language', 'imglang')
      .orderBy('products.createdAt', 'DESC')
      .take(limit)
      .skip(skip);
    if (locale) {
      query
        .where('lang.name = :locale', { locale })
        .andWhere('imglang.name = :locale', { locale });
    }
    if (isFeatured) {
      query.andWhere('products.isFeatured = true');
    }
    return query.getManyAndCount();
  }

  findProductById(id: number, getProductByIdDto: GetProductByIdDto) {
    const { locale } = getProductByIdDto;
    console.log(getProductByIdDto);

    const query = this.createQueryBuilder('products')
      .leftJoinAndSelect('products.languages', 'productlanguages')
      .leftJoinAndSelect('products.images', 'images')
      .innerJoinAndSelect('productlanguages.language', 'lang')
      .leftJoinAndSelect('images.languages', 'imagelanguage')
      .innerJoinAndSelect('imagelanguage.language', 'imglang')
      .where('products.id = :id', { id });

    if (locale) {
      query
        .andWhere('lang.name = :locale', { locale })
        .andWhere('imglang.name = :locale', { locale });
    }
    return query.getOneOrFail();
  }
}
