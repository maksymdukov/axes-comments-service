import { Language } from 'src/language/language.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductLanguage {
  @PrimaryColumn()
  productId: number;

  @PrimaryColumn()
  languageId: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  longDescription: string;

  @ManyToOne(() => Product, (product) => product.languages, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @ManyToOne(() => Language, (language) => language.productLanguages, {
    onDelete: 'CASCADE',
  })
  language: Language;
}
