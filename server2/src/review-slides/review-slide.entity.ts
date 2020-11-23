import { Image } from 'src/images/image.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ReviewSlide {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'review slide' })
  name: string;

  @OneToOne(() => Image, (image) => image.reviewSlide)
  @JoinColumn()
  image: Image;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
