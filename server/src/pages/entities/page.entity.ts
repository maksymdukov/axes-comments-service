import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PageLanguage } from './page-language.entity';

@Entity()
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => PageLanguage, (pageLanguage) => pageLanguage.page, {
    eager: true,
    cascade: ['update', 'insert'],
  })
  languages: PageLanguage[];
}
