import { AnonymousUser } from 'src/anonymous-users/anonymous-user.entity';
import { Delivery } from 'src/delivery/delivery.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EOrderStatus } from '../enums/order-status.enum';
import { CustomOrderDetails } from './custom-order-details.entity';
import { OrderDetails } from './order-details.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ enum: EOrderStatus, default: EOrderStatus.new })
  status: EOrderStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderDetails, (details) => details.order)
  details: OrderDetails[];

  @OneToMany(() => CustomOrderDetails, (customDetails) => customDetails.order)
  customDetails: CustomOrderDetails[];

  @ManyToOne(() => User, (user) => user.orders, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  user: User;

  @ManyToOne(() => AnonymousUser, (anonymousUser) => anonymousUser.orders, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  anonymousUser: AnonymousUser;

  @ManyToOne(() => Delivery, (delivery) => delivery.orders, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  delivery: Delivery;
}
