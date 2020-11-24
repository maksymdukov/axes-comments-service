import { Body, Controller, Post } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateAnonymousOrderDto } from '../dto/create-anonymous-order.dto';
import { OrdersService } from '../services/orders.service';

@Controller('/api/v1/users/orders')
export class OrdersUserController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  createOrder(
    @Body() createOrderDto: CreateAnonymousOrderDto,
    @GetUser() user: User,
  ) {
    // TODO manual test
    return this.ordersService.create(createOrderDto, user);
  }
}
