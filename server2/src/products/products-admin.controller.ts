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
import { JwtAuth } from 'src/auth/decorators/jwt-auth.decorator';
import { UserRoles } from 'src/users/enums/roles.enum';
import { PaginatedQuery } from 'src/utils/pagination/paginated-query.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { GetAdminProductsDto } from './dto/get-admin-products.dto';
import { GetProductsTransform } from './pipes/get-products-transform.pipe';
import { ProductsService } from './products.service';

@Controller('api/admin/products')
@JwtAuth(UserRoles.admin)
export class ProductsAdminController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(
    @PaginatedQuery(GetProductsTransform)
    getAdminProductsDto: GetAdminProductsDto,
  ) {
    return this.productsService.getProducts(getAdminProductsDto);
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
