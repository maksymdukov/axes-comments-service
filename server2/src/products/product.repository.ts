import { EntityRepository, In, Repository } from 'typeorm';
import { Product } from './product.entity';
import { GetProductsDto } from './dto/get-products.dto';
import { GetOneProductDto } from './dto/get-product-by-id.dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  private getPopulatedProduct() {
    return this.createQueryBuilder('products')
      .leftJoinAndSelect('products.languages', 'productlanguages')
      .leftJoinAndSelect('products.images', 'images')
      .innerJoinAndSelect('productlanguages.language', 'lang')
      .leftJoinAndSelect('images.languages', 'imagelanguage')
      .innerJoinAndSelect('imagelanguage.language', 'imglang');
  }

  async findProducts(getProductsDto: GetProductsDto) {
    const { skip, limit, locale, isFeatured } = getProductsDto;
    const query = this.getPopulatedProduct()
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

  findProductById(id: number, getProductByIdDto: GetOneProductDto) {
    const { locale } = getProductByIdDto;
    const query = this.getPopulatedProduct().where('products.id = :id', { id });

    if (locale) {
      query
        .andWhere('lang.name = :locale', { locale })
        .andWhere('imglang.name = :locale', { locale });
    }
    return query.getOneOrFail();
  }

  findProductBySlug(slug: string, getOneProductDto: GetOneProductDto) {
    const { locale } = getOneProductDto;
    const query = this.getPopulatedProduct().where('products.slug = :slug', {
      slug,
    });

    if (locale) {
      query
        .andWhere('lang.name = :locale', { locale })
        .andWhere('imglang.name = :locale', { locale });
    }
    return query.getOneOrFail();
  }

  getProductsPrices(slugs: string[]) {
    return this.find({ where: { slug: In(slugs) } });
  }
}
