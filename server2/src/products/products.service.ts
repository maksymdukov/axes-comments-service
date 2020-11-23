import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageRepository } from 'src/images/image.repository';
import { LanguageService } from 'src/language/language.service';
import { ELanguage } from 'src/language/languages.enum';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductLanguageRepository } from './product-language.repository';
import { ProductRepository } from './product.repository';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { GetProductsDto } from './dto/get-products.dto';
import { GetOneProductDto } from './dto/get-product-by-id.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductRepository)
    private productsRepository: ProductRepository,
    @InjectRepository(ImageRepository) private imageRepository: ImageRepository,
    @InjectRepository(ProductLanguageRepository)
    private productLanguageRepository: ProductLanguageRepository,
    private languageService: LanguageService,
    private paginationService: PaginationService,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    const {
      imageIds,
      price,
      slug,
      ruDescription,
      ruLongDescription,
      ruTitle,
      ukDescription,
      ukLongDescription,
      ukTitle,
    } = createProductDto;
    const images = await this.imageRepository.findByIds(imageIds);
    let product = this.productsRepository.create({
      price,
      slug,
      images,
    });
    try {
      product = await this.productsRepository.save(product);
    } catch (error) {
      if (error?.code === '23505') {
        throw new BadRequestException('this slug already exists');
      }
    }
    const productRu = this.productLanguageRepository.create({
      language: this.languageService.ru,
      product,
      title: ruTitle,
      description: ruDescription,
      longDescription: ruLongDescription,
    });
    const productUk = this.productLanguageRepository.create({
      language: this.languageService.uk,
      product,
      title: ukTitle,
      description: ukDescription,
      longDescription: ukLongDescription,
    });
    await Promise.all([
      this.productLanguageRepository.save(productRu),
      this.productLanguageRepository.save(productUk),
    ]);
    return product;
  }

  async deleteProduct(id: number) {
    const product = await this.productsRepository.findOneOrFail(id);
    return this.productsRepository.remove(product);
  }

  async updateProduct(id: number, updateProductDto: CreateProductDto) {
    const {
      imageIds,
      price,
      ruDescription,
      ruLongDescription,
      ruTitle,
      slug,
      ukDescription,
      ukLongDescription,
      ukTitle,
      isFeatured,
    } = updateProductDto;
    const [product, images] = await Promise.all([
      this.productsRepository.findOneOrFail(id),
      this.imageRepository.findByIds(imageIds),
    ]);
    product.price = price;
    product.slug = slug;
    product.images = images;
    product.isFeatured = isFeatured;
    const [productRu, productUk] = await Promise.all([
      this.productLanguageRepository.findProductLanguage(
        product.id,
        ELanguage.ru,
      ),
      this.productLanguageRepository.findProductLanguage(
        product.id,
        ELanguage.uk,
      ),
    ]);
    productRu.title = ruTitle;
    productRu.description = ruDescription;
    productRu.longDescription = ruLongDescription;

    productUk.title = ukTitle;
    productUk.description = ukDescription;
    productUk.longDescription = ukLongDescription;

    const [prod] = await Promise.all([
      this.productsRepository.save(product),
      this.productLanguageRepository.save(productRu),
      this.productLanguageRepository.save(productUk),
    ]);
    return prod;
  }

  async getProducts(getProductsDto: GetProductsDto) {
    const [products, total] = await this.productsRepository.findProducts(
      getProductsDto,
    );
    return this.paginationService.paginateOutput(
      products,
      total,
      getProductsDto,
    );
  }

  async getProductById(id: number, getProductByIdDto: GetOneProductDto) {
    return this.productsRepository.findProductById(id, getProductByIdDto);
  }

  async getProductBySlug(slug: string, getOneProductDto: GetOneProductDto) {
    return this.productsRepository.findProductBySlug(slug, getOneProductDto);
  }
}
