import { Body, Controller, Post } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateCustomOrderDto } from '../dto/create-custom-order.dto';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrdersService } from '../services/orders.service';

@Controller('/api/v1/users/orders')
export class OrdersUserController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto, @GetUser() user: User) {
    // TODO manual test
    return this.ordersService.create(createOrderDto, user);
  }

  @Post()
  createCustomOrder(
    @Body() createOrderDto: CreateCustomOrderDto,
    @GetUser() user: User,
  ) {
    // TODO manual test
    return this.ordersService.create(createOrderDto, user);
  }
}
