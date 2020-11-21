import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../products/product.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titleUk: string;

  @Column()
  titleRu: string;

  @Column()
  imageId: string;

  @Column({ type: 'text' })
  url: string;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column({ length: 100 })
  contentType: string;

  @Column()
  fileName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Product, (product) => product.images)
  products: Product[];
}
