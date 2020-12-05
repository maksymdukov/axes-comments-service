import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesAdminController } from './pages-admin.controller';
import { PagesController } from './pages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageLanguage } from './entities/page-language.entity';
import { LanguageModule } from 'src/language/language.module';
import { PagesRepository } from './pages.respository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PagesRepository, PageLanguage]),
    LanguageModule,
  ],
  controllers: [PagesAdminController, PagesController],
  providers: [PagesService],
})
export class PagesModule {}
