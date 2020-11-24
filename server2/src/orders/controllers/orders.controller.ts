import { Body, Controller, Post } from '@nestjs/common';
import { CreateAnonymousOrderDto } from '../dto/create-anonymous-order.dto';
import { OrdersService } from '../services/orders.service';

@Controller('/api/v1/orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  createAnonymousOrder(@Body() createOrderDto: CreateAnonymousOrderDto) {
    return this.ordersService.create(createOrderDto);
  }
}
