import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PaginatedQuery } from 'src/utils/pagination/paginated-query.decorator';
import { PaginationDto } from 'src/utils/pagination/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@Controller('api/admin/products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(@PaginatedQuery() paginationDto: PaginationDto) {
    return this.productsService.getProducts(paginationDto);
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.deleteProduct(id);
  }

  @Patch(':id')
  updateProduct(
    @Body() updateProductDto: CreateProductDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.productsService.updateProduct(id, updateProductDto);
  }
}
