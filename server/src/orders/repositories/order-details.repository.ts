import { EntityRepository, Repository } from 'typeorm';
import { OrderDetails } from '../entities/order-details.entity';

@EntityRepository(OrderDetails)
export class OrderDetailsRepository extends Repository<OrderDetails> {
  async getByOrderId(orderId: number) {
    return this.find({
      where: { order: { id: orderId } },
      relations: ['product'],
    });
  }
}
