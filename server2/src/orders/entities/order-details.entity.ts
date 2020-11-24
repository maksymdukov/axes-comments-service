import { Product } from 'src/products/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './orders.entity';

@Entity()
export class OrderDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  qty: number;

  @Column({ type: 'real' })
  currentPrice: number;

  @OneToOne(() => Product)
  @JoinColumn()
  product: Product;

  @ManyToOne(() => Order, (order) => order.details, { onDelete: 'CASCADE' })
  order: Order;
}
