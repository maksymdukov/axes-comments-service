import { Comment } from 'src/comments/comment.entity';
import { Order } from 'src/orders/entities/orders.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AnonymousUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  middleName: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  email: string;

  @OneToMany(() => Order, (order) => order.anonymousUser)
  orders: Order[];

  @OneToMany(() => Comment, (comment) => comment.anonymousUser)
  comments: Comment[];
}
