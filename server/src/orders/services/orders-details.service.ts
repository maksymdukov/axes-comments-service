import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ELanguage } from 'src/language/languages.enum';
import { ProductsService } from 'src/products/products.service';
import { ChangeAnonymousOrderDto } from '../dto/change-anonymous-order.dto';
import { Order } from '../entities/orders.entity';
import { OrderDetailsRepository } from '../repositories/order-details.repository';
import { get } from 'lodash';
import { DeepPartial } from 'typeorm';
import { OrderDetails } from '../entities/order-details.entity';
import { CreateManyOrderDetailsDto } from '../dto/create-many-order-details.dto';
import { OrderItemDto } from '../dto/order-item.dto';

interface HashMap<T> {
  [index: string]: T;
}

@Injectable()
export class OrdersDetailsService {
  constructor(
    @InjectRepository(OrderDetailsRepository)
    private orderDetailsRepository: OrderDetailsRepository,
    private productsService: ProductsService,
  ) {}

  async changeMany(changeOrderDto: { items: OrderItemDto[] }, order: Order) {
    const { items } = changeOrderDto;
    // existing order items
    const existingItems = await this.orderDetailsRepository.getByOrderId(
      order.id,
    );
    const existingItemsMap = this.generateHashMapById(existingItems, [
      'product',
      'id',
    ]);
    const updatedItemsMap = this.generateHashMapById(items, ['id']);
    const orderDetailsToDelete = existingItems.filter(
      (existingItem) => !updatedItemsMap[existingItem.product.id],
    );
    await this.orderDetailsRepository.remove(orderDetailsToDelete);
    const promises = items.map(async (item) => {
      if (existingItemsMap[item.id]) {
        // edit existing product
        const itemToEdit = existingItemsMap[item.id];
        itemToEdit.qty = item.count;
        return this.orderDetailsRepository.save(itemToEdit);
      } else {
        // create new order detail
        const product = await this.productsService.getProductBySlug(item.slug, {
          locale: ELanguage.uk,
        });
        const newOrderDetail = this.orderDetailsRepository.create({
          currentPrice: product.price,
          qty: item.count,
          order,
        });
        return this.orderDetailsRepository.save(newOrderDetail);
      }
    });
    await Promise.all(promises);
  }

  async createMany(
    order: Order,
    createManyOrderDetailsDto: CreateManyOrderDetailsDto,
  ) {
    const { items } = createManyOrderDetailsDto;
    // create order details
    const slugs = items.map((item) => item.slug);
    const productPricesMap = await this.productsService.getProductsPrices(
      slugs,
    );
    const orderDetailsInput: DeepPartial<OrderDetails>[] = items.map(
      (item) => ({
        currentPrice: productPricesMap[item.slug],
        qty: item.count,
        product: { id: item.id },
        order,
      }),
    );
    const orderDetails = this.orderDetailsRepository.create(orderDetailsInput);
    return this.orderDetailsRepository.save(orderDetails);
  }

  private generateHashMapById<T>(items: T[], idPath: string[]): HashMap<T> {
    return items.reduce((acc, item) => {
      const id = get(item, idPath);
      acc[id] = item;
      return acc;
    }, {});
  }
}
