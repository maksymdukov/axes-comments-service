import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { PaginatedQuery } from 'src/utils/pagination/paginated-query.decorator';
import { GetOneProductDto } from './dto/get-product-by-id.dto';
import { GetProductsDto } from './dto/get-products.dto';
import { GetProductsTransform } from './pipes/get-products-transform.pipe';
import { ProductsService } from './products.service';

@Controller('/api/v1/products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(
    @PaginatedQuery(GetProductsTransform)
    getProductsDto: GetProductsDto,
  ) {
    return this.productsService.getProducts(getProductsDto);
  }

  @Get('slugs')
  getProductSlugs() {
    return this.productsService.getSlugs();
  }

  @Get(':id')
  getProductById(
    @Param('id', ParseIntPipe) id: number,
    @Query() getProductByIdDto: GetOneProductDto,
  ) {
    return this.productsService.getProductById(id, getProductByIdDto);
  }

  @Get('/slug/:slug')
  getProductBySlug(
    @Param('slug') slug: string,
    @Query() getOneProductDto: GetOneProductDto,
  ) {
    return this.productsService.getProductBySlug(slug, getOneProductDto);
  }
}
