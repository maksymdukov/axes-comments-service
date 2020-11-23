import { PaginationDto } from 'src/utils/pagination/pagination.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Product } from './product.entity';
import { IFindProductsOptions } from './interfaces/find-products-options.interface';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async findProducts(
    paginationDto: PaginationDto,
    opts: IFindProductsOptions = {},
  ) {
    const { isFeatured = false, isLocalized = false } = opts;
    const { skip, limit } = paginationDto;
    // TODO
    // order by created date

    // TODO
    // add featured products table
    const query = this.createQueryBuilder('products')
      .leftJoinAndSelect('products.languages', 'productlanguages')
      .leftJoinAndSelect('products.images', 'images')
      .innerJoinAndSelect('productlanguages.language', 'lang')
      .leftJoinAndSelect('images.languages', 'imagelanguage')
      .innerJoinAndSelect('imagelanguage.language', 'imglang')
      .orderBy('products.createdAt', 'DESC')
      .take(limit)
      .skip(skip);
    if (isLocalized) {
      query
        .where('lang.name = :locale', { locale: paginationDto.locale })
        .andWhere('imglang.name = :locale', { locale: paginationDto.locale });
    }
    if (isFeatured) {
      query.andWhere('products.isFeatured = true');
    }
    return query.getManyAndCount();
  }
}
