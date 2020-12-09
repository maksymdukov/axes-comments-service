import { Order } from 'src/orders/entities/orders.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EDelivery } from './delivery.enum';

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: EDelivery })
  type: string;

  @Column({ nullable: true })
  idx: number;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  branch: string;

  @Column({ nullable: true })
  settlement: string;

  @OneToMany(() => Order, (order) => order.delivery, {
    nullable: true,
  })
  orders: Order[];

  @ManyToOne(() => User, (user) => user.deliveries, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  user: User;
}
