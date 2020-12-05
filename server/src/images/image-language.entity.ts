import { Language } from 'src/language/language.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Image } from './image.entity';

@Entity()
export class ImageLanguage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Image, (image) => image.languages, {
    onDelete: 'CASCADE',
  })
  image: Image;

  @ManyToOne(() => Language, (language) => language.imageLanguages)
  language: Language;
}
