import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LANGUAGES } from './language.constants';
import { Language } from './language.entity';
import { LanguageRepository } from './language.repository';
import { LanguageService } from './language.service';

@Module({
  imports: [TypeOrmModule.forFeature([Language])],
  providers: [
    LanguageService,
    {
      provide: LANGUAGES,
      inject: [LanguageRepository],
      useFactory: async (languageRepository: LanguageRepository) => {
        // TODO check for existence of specific languages
        // add if they do not exist
        const languages = await languageRepository.find({});
        return languages;
      },
    },
  ],
  exports: [LanguageService],
})
export class LanguageModule {}
