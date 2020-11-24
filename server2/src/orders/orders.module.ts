import { Module } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { DeliveryModule } from 'src/delivery/delivery.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/products.module';
import { OrdersAdminController } from './controllers/orders-admin.controller';
import { OrderDetailsRepository } from './repositories/order-details.repository';
import { OrdersRepository } from './repositories/orders.repository';
import { CustomOrderDetails } from './entities/custom-order-details.entity';
import { OrdersDetailsService } from './services/orders-details.service';
import { CustomOrdersDetailsService } from './services/custom-orders-details.service';
import { OrdersController } from './controllers/orders.controller';
import { AnonymousUsersModule } from 'src/anonymous-users/anonymous-users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrdersRepository,
      OrderDetailsRepository,
      CustomOrderDetails,
    ]),
    DeliveryModule,
    ProductsModule,
    AnonymousUsersModule,
  ],
  providers: [OrdersService, OrdersDetailsService, CustomOrdersDetailsService],
  controllers: [OrdersController, OrdersAdminController],
})
export class OrdersModule {}
