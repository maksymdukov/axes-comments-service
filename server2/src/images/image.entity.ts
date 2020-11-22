import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../products/product.entity';
import { ImageLanguage } from './image-language.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

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

  @OneToMany(() => ImageLanguage, (imageLanguage) => imageLanguage.image)
  languages: ImageLanguage;

  @ManyToMany(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  products: Product[];

  titleRu: string;
  titleUk: string;
}
