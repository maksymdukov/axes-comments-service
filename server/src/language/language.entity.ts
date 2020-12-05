import { ImageLanguage } from 'src/images/image-language.entity';
import { ProductLanguage } from 'src/products/product-language.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ELanguage } from './languages.enum';

@Entity()
export class Language {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: Object.values(ELanguage) })
  name: ELanguage;

  @OneToMany(() => ImageLanguage, (imageLanguage) => imageLanguage.language)
  imageLanguages: ImageLanguage;

  @OneToMany(
    () => ProductLanguage,
    (productLanguage) => productLanguage.language,
  )
  productLanguages: ProductLanguage;
}
