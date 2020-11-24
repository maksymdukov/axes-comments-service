import { EntityRepository, Repository } from 'typeorm';
import { GetOrdersDto } from '../dto/get-orders.dto';
import { Order } from '../entities/orders.entity';
import { EOrderStatus } from '../enums/order-status.enum';

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
  getOrders(getOrdersDto: GetOrdersDto) {
    const { limit, skip, status } = getOrdersDto;
    return this.findAndCount({
      take: limit,
      skip,
      relations: [
        'details',
        'details.product',
        'user',
        'anonymousUser',
        'delivery',
      ],
      where: status ? { status } : {},
    });
  }

  getOrder(id: number) {
    return this.findOneOrFail(id, {
      relations: [
        'details',
        'details.product',
        'user',
        'anonymousUser',
        'delivery',
      ],
    });
  }

  async changeById(
    id: number,
    changeOrderDto: { comment: string; status: EOrderStatus },
  ) {
    const { comment, status } = changeOrderDto;
    const order = await this.getOrder(id);
    order.comment ||= comment;
    order.status ||= status;
    return this.save(order);
  }
}
