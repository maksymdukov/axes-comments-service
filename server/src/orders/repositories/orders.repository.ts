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
        'details.product.images',
        'details.product.languages',
        'customDetails',
        'customDetails.image',
        'user',
        'anonymousUser',
        'delivery',
      ],
      where: status ? { status } : {},
      order: {
        createdAt: 'DESC',
      },
    });
  }

  getOrder(id: number) {
    return this.findOneOrFail(id, {
      relations: [
        'details',
        'details.product',
        'details.product.images',
        'details.product.languages',
        'customDetails',
        'customDetails.image',
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
    order.comment = comment ?? order.comment;
    order.status = status ?? order.status;
    return this.save(order);
  }
}
