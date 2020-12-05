import { Comment } from 'src/comments/comment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Image } from '../images/image.entity';
import { ProductLanguage } from './product-language.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'real' })
  price: number;

  @Column({ unique: true })
  slug: string;

  @Column({ default: false, nullable: true })
  isFeatured: boolean;

  @Column({ default: true, select: false })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Image, { nullable: true, eager: true })
  mainImage: Image;

  @ManyToMany(() => Image, (image) => image.products)
  @JoinTable()
  images: Image[];

  @OneToMany(
    () => ProductLanguage,
    (productLanguage) => productLanguage.product,
  )
  languages: ProductLanguage[];

  @OneToMany(() => Comment, (comment) => comment.product)
  comments: Comment[];
}
