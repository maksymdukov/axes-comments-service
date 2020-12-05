import { EntityRepository, In, Repository } from 'typeorm';
import { Product } from './product.entity';
import { GetProductsDto } from './dto/get-products.dto';
import { GetOneProductDto } from './dto/get-product-by-id.dto';
import { GetAdminProductsDto } from './dto/get-admin-products.dto';
import { EProductDirection } from './enums/product-direction.enum';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  private getPopulatedProduct() {
    return this.createQueryBuilder('products')
      .leftJoinAndSelect('products.languages', 'productlanguages')
      .innerJoinAndSelect('productlanguages.language', 'lang')
      .leftJoinAndSelect('products.images', 'images')
      .leftJoinAndSelect('products.mainImage', 'mainImage')
      .leftJoinAndSelect('mainImage.languages', 'mainImglangs')
      .innerJoinAndSelect('mainImglangs.language', 'mainImglang')
      .leftJoinAndSelect('images.languages', 'imagelanguage')
      .innerJoinAndSelect('imagelanguage.language', 'imglang');
  }

  async findProducts(getProductsDto: GetProductsDto | GetAdminProductsDto) {
    const {
      skip,
      limit,
      locale,
      isFeatured,
      featured,
      sort,
      order,
    } = getProductsDto;
    const query = this.getPopulatedProduct()
      .orderBy('products.createdAt', 'DESC')
      .take(limit)
      .skip(skip);
    if (locale) {
      query
        .where('lang.name = :locale', { locale })
        .andWhere('imglang.name = :locale', { locale })
        .andWhere('mainImglang.name = :locale', { locale });
    }
    if (featured) {
      query.andWhere('products.isFeatured = :isFeatured', { isFeatured });
    }
    if (sort) {
      query.orderBy(`products.${sort}`, order);
    } else {
      query.orderBy('products.createdAt', order);
    }

    if (getProductsDto instanceof GetProductsDto) {
      const { condition, direction, date } = getProductsDto;
      if (condition) {
        query.andWhere(
          `date_trunc('milliseconds', products.${condition}) ${
            direction === EProductDirection.gt ? '>' : '<'
          } :date`,
          {
            condition,
            date: new Date(date),
          },
        );
      }
    }

    if (getProductsDto instanceof GetAdminProductsDto) {
      query.addSelect('products.isActive');
      if (getProductsDto.active) {
        query.andWhere('products.isActive = :isActive', {
          isActive: getProductsDto.isActive,
        });
      }
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

  getSlugs() {
    return this.find({ select: ['slug'], where: { isActive: true } });
  }
}
