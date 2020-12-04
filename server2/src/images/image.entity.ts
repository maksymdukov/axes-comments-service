import { ReviewSlide } from 'src/review-slides/review-slide.entity';
import { Slide } from 'src/slides/slide.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
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

  @Column({ nullable: true })
  size: number;

  @Column({ length: 100 })
  contentType: string;

  @Column()
  fileName: string;

  @Column({ select: false, default: true })
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ImageLanguage, (imageLanguage) => imageLanguage.image, {
    eager: true,
  })
  languages: ImageLanguage[];

  @OneToMany(() => Slide, (slide) => slide.bigImage)
  bigSlides: Slide[];

  @OneToMany(() => Slide, (slide) => slide.smallImage)
  smallSlides: Slide[];

  @OneToOne(() => ReviewSlide, (slide) => slide.image)
  reviewSlide: ReviewSlide;

  @ManyToMany(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  products: Product[];

  titleRu: string;
  titleUk: string;
}
