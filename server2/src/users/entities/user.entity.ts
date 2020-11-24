import { Comment } from 'src/comments/comment.entity';
import { Delivery } from 'src/delivery/delivery.entity';
import { Order } from 'src/orders/entities/orders.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRoles } from '../enums/roles.enum';
import { UserProfile } from './profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-array', { default: [] })
  roles: UserRoles[];

  @Column((type) => UserProfile)
  profile: UserProfile;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Delivery, (delivery) => delivery.user)
  deliveries: Delivery;
}
