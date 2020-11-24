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

@Controller('/api/admin/orders')
export class OrdersAdminController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  getOrders(@PaginatedQuery() getOrdersDto: GetOrdersDto) {
    return this.ordersService.get(getOrdersDto);
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
