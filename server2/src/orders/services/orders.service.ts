import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryService } from 'src/delivery/delivery.service';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { ChangeOrderStatusDto } from '../dto/change-order-status.dto';
import { ChangeAnonymousOrderDto } from '../dto/change-anonymous-order.dto';
import { CreateAnonymousOrderDto } from '../dto/create-anonymous-order.dto';
import { GetOrdersDto } from '../dto/get-orders.dto';
import { User } from 'src/users/entities/user.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrdersRepository } from '../repositories/orders.repository';
import { Order } from '../entities/orders.entity';
import { OrdersDetailsService } from './orders-details.service';
import { AnonymousUsersService } from 'src/anonymous-users/anonymous-users.service';
import { ChangeOrderDto } from '../dto/change-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private deliveryService: DeliveryService,
    @InjectRepository(OrdersRepository)
    private ordersRepository: OrdersRepository,
    private pagionationService: PaginationService,
    private orderDetailsService: OrdersDetailsService,
    private anonymousUsersService: AnonymousUsersService,
  ) {}

  async create(
    createOrderDto: CreateAnonymousOrderDto | CreateOrderDto,
    user?: User,
  ) {
    let order: Order;
    if (createOrderDto instanceof CreateOrderDto) {
      // existing user
      order = await this.createOrder(createOrderDto, user);
    } else if (createOrderDto instanceof CreateAnonymousOrderDto) {
      // anonymous user
      order = await this.createAnonymousOrder(createOrderDto);
    }
    await this.ordersRepository.save(order);
    await this.orderDetailsService.createMany(order, createOrderDto);
    return order;
  }

  private async createOrder(createOrderDto: CreateOrderDto, user: User) {
    const { comment } = createOrderDto;
    return this.ordersRepository.create({
      user,
      comment,
      delivery: { id: createOrderDto.deliveryId },
    });
  }
  private async createAnonymousOrder(createOrderDto: CreateAnonymousOrderDto) {
    const {
      email,
      firstName,
      lastName,
      middleName,
      phone,
      comment,
    } = createOrderDto;
    // create anonymous user
    const anonymousUser = await this.anonymousUsersService.create({
      email,
      firstName,
      lastName,
      middleName,
      phone,
    });

    // create delivery
    const delivery = await this.deliveryService.create(createOrderDto);
    // create order
    return this.ordersRepository.create({
      anonymousUser,
      comment,
      delivery,
    });
  }

  async get(getOrdersDto: GetOrdersDto) {
    return this.pagionationService.paginateOutput(
      await this.ordersRepository.getOrders(getOrdersDto),
      getOrdersDto,
    );
  }

  async changeStatus(id: number, changeOrderStatusDto: ChangeOrderStatusDto) {
    const order = await this.ordersRepository.findOneOrFail(id);
    order.status = changeOrderStatusDto.status;
    return this.ordersRepository.save(order);
  }

  async change(
    id: number,
    changeOrderDto: ChangeAnonymousOrderDto | ChangeOrderDto,
  ) {
    const order = await this.ordersRepository.changeById(id, changeOrderDto);
    if (changeOrderDto instanceof ChangeAnonymousOrderDto) {
      await this.anonymousUsersService.change(
        order.anonymousUser.id,
        changeOrderDto,
      );
    }
    // order items
    await this.orderDetailsService.changeMany(changeOrderDto, order);
    return this.ordersRepository.getOrder(id);
  }

  async delete(id: number) {
    const order = await this.ordersRepository.getOrder(id);
    return this.ordersRepository.remove(order);
  }
}
