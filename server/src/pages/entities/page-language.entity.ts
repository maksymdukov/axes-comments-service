import { Language } from 'src/language/language.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Page } from './page.entity';

@Entity()
export class PageLanguage {
  @PrimaryColumn()
  pageId: number;

  @PrimaryColumn()
  languageId: number;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => Page, (page) => page.languages, {
    onDelete: 'CASCADE',
  })
  page: Page;

  @ManyToOne(() => Language, { eager: true })
  language: Language;
}
