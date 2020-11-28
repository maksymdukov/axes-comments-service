import { EntityRepository, In, Repository } from 'typeorm';
import { Product } from './product.entity';
import { GetProductsDto } from './dto/get-products.dto';
import { GetOneProductDto } from './dto/get-product-by-id.dto';
import { GetAdminProductsDto } from './dto/get-admin-products.dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  private getPopulatedProduct() {
    return this.createQueryBuilder('products')
      .leftJoinAndSelect('products.languages', 'productlanguages')
      .leftJoinAndSelect('products.images', 'images')
      .leftJoinAndSelect('products.mainImage', 'mainImage')
      .innerJoinAndSelect('productlanguages.language', 'lang')
      .leftJoinAndSelect('images.languages', 'imagelanguage')
      .innerJoinAndSelect('imagelanguage.language', 'imglang');
  }

  async findProducts(getProductsDto: GetProductsDto | GetAdminProductsDto) {
    const { skip, limit, locale, isFeatured } = getProductsDto;
    const query = this.getPopulatedProduct()
      .orderBy('products.createdAt', 'DESC')
      .take(limit)
      .skip(skip);
    if (getProductsDto instanceof GetAdminProductsDto) {
      query.addSelect('products.isActive');
    }
    if (locale) {
      query
        .where('lang.name = :locale', { locale })
        .andWhere('imglang.name = :locale', { locale });
    }
    if (isFeatured) {
      query.andWhere('products.isFeatured = true');
    }
    if (
      getProductsDto instanceof GetAdminProductsDto &&
      getProductsDto.isActive !== undefined
    ) {
      query.andWhere('products.isActive = :isActive', {
        isActive: getProductsDto.isActive,
      });
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
