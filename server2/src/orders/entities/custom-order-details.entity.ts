import { Image } from 'src/images/image.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './orders.entity';

@Entity()
export class CustomOrderDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.customDetails, {
    onDelete: 'CASCADE',
  })
  order: Order;

  @OneToOne(() => Image)
  @JoinColumn()
  image: Image;
}
