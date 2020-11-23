import { Image } from 'src/images/image.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Slide {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'slide' })
  name: string;

  @ManyToOne(() => Image, (image) => image.bigSlides, { onDelete: 'CASCADE' })
  bigImage: Image;

  @ManyToOne(() => Image, (image) => image.smallSlides, { onDelete: 'CASCADE' })
  smallImage: Image;
}
