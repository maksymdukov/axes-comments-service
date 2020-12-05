import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { PaginatedQuery } from 'src/utils/pagination/paginated-query.decorator';
import { ChangeOrderStatusDto } from '../dto/change-order-status.dto';
import { ChangeAnonymousOrderDto } from '../dto/change-anonymous-order.dto';
import { GetOrdersDto } from '../dto/get-orders.dto';
import { OrdersService } from '../services/orders.service';
import { ChangeOrderDto } from '../dto/change-order.dto';
import { ChangeAnonymousCustomOrderDto } from '../dto/change-anonymous-custom-order.dto';
import { UserRoles } from 'src/users/enums/roles.enum';
import { JwtAuth } from 'src/auth/decorators/jwt-auth.decorator';

@Controller('/api/admin/orders')
@JwtAuth(UserRoles.admin)
export class OrdersAdminController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  getOrders(@PaginatedQuery() getOrdersDto: GetOrdersDto) {
    return this.ordersService.get(getOrdersDto);
  }

  @Get(':id')
  getOrder(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.getById(id);
  }

  @Patch(':id/status')
  changeOrderStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() changeOrderStatusDto: ChangeOrderStatusDto,
  ) {
    return this.ordersService.changeStatus(id, changeOrderStatusDto);
  }

  @Patch('/anonymous/:id')
  changeAnonymousOrder(
    @Body() changeAnonymousOrderDto: ChangeAnonymousOrderDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.ordersService.change(id, changeAnonymousOrderDto);
  }

  @Patch('/anonymous/custom/:id')
  changeCustomOrder(
    @Body() changeOrderDto: ChangeAnonymousCustomOrderDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.ordersService.change(id, changeOrderDto);
  }

  @Patch(':id')
  changeOrder(
    @Body() changeOrderDto: ChangeOrderDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.ordersService.change(id, changeOrderDto);
  }

  @Delete(':id')
  deleteOrder(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.delete(id);
  }
}
