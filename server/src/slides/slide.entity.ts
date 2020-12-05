import { Image } from 'src/images/image.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Slide {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'slide' })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Image, (image) => image.bigSlides, { onDelete: 'CASCADE' })
  bigImage: Image;

  @ManyToOne(() => Image, (image) => image.smallSlides, { onDelete: 'CASCADE' })
  smallImage: Image;
}
