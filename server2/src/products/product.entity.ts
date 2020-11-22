import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Image, (image) => image.products)
  @JoinTable()
  images: Image[];

  @OneToMany(
    () => ProductLanguage,
    (productLanguage) => productLanguage.product,
  )
  languages: ProductLanguage;
}
