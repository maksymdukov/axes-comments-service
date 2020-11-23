import { Controller, Get } from '@nestjs/common';
import { PaginatedQuery } from 'src/utils/pagination/paginated-query.decorator';
import { GetProductsDto } from './dto/get-products.dto';
import { DefaultLocaleTransform } from './pipes/deafult-locale.pipe';
import { GetProductsTransform } from './pipes/get-products-transform.pipe';
import { ProductsService } from './products.service';

@Controller('/api/v1/products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('localized')
  getProductsByLang(
    @PaginatedQuery(GetProductsTransform, DefaultLocaleTransform)
    getProductsDto: GetProductsDto,
  ) {
    return this.productsService.getProductsByLang(getProductsDto);
  }
}
