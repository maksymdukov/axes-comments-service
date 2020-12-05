import { AnonymousUser } from 'src/anonymous-users/anonymous-user.entity';
import { Product } from 'src/products/product.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommentStatus } from './enums/comment-status.enum';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  rating: number;

  @Column({ type: 'text' })
  content: string;

  @Column({
    enum: Object.values(CommentStatus),
    default: CommentStatus.pending,
  })
  status: CommentStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Product, (product) => product.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'slug', name: 'slugId' })
  product: Product;

  @ManyToOne(() => AnonymousUser, (user) => user.comments, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  anonymousUser: AnonymousUser;

  @ManyToOne(() => User, (user) => user.comments, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}
