import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesAdminController } from './pages-admin.controller';
import { PagesController } from './pages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from './entities/page.entity';
import { PageLanguage } from './entities/page-language.entity';
import { LanguageModule } from 'src/language/language.module';

@Module({
  imports: [TypeOrmModule.forFeature([Page, PageLanguage]), LanguageModule],
  controllers: [PagesAdminController],
  providers: [PagesService],
})
export class PagesModule {}
