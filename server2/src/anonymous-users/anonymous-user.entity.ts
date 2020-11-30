import { Comment } from 'src/comments/comment.entity';
import { Order } from 'src/orders/entities/orders.entity';
import { UserProfile } from 'src/users/entities/profile.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AnonymousUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column((type) => UserProfile)
  profile: UserProfile;

  @Column()
  email: string;

  @OneToMany(() => Order, (order) => order.anonymousUser)
  orders: Order[];

  @OneToMany(() => Comment, (comment) => comment.anonymousUser)
  comments: Comment[];
}
