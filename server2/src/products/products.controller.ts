import { Controller, Get } from '@nestjs/common';
import { PaginatedQuery } from 'src/utils/pagination/paginated-query.decorator';
import { PaginationDto } from 'src/utils/pagination/pagination.dto';
import { ProductsService } from './products.service';

@Controller('/api/v1/products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('localized')
  getProductsByLang(@PaginatedQuery() paginationDto: PaginationDto) {
    return this.productsService.getProductsByLang(paginationDto);
  }
}
