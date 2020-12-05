import { ELanguage } from 'src/language/languages.enum';
import { EntityRepository, Repository } from 'typeorm';
import { ProductLanguage } from './product-language.entity';

@EntityRepository(ProductLanguage)
export class ProductLanguageRepository extends Repository<ProductLanguage> {
  async findProductLanguage(productId: number, language: ELanguage) {
    return this.createQueryBuilder('productlanguage')
      .leftJoinAndSelect('productlanguage.language', 'language')
      .leftJoinAndSelect('productlanguage.product', 'product')
      .where('product.id = :productId', { productId })
      .andWhere('language.name = :lngname', {
        lngname: language,
      })
      .getOneOrFail();
  }
}
