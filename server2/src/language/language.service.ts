import { Inject, Injectable } from '@nestjs/common';
import { LANGUAGES } from './language.constants';
import { Language } from './language.entity';
import { ELanguage } from './languages.enum';

interface Langs {
  [idx: string]: Language;
}

@Injectable()
export class LanguageService {
  langs: Langs = {};
  constructor(@Inject(LANGUAGES) private languages: Language[]) {}

  get ru() {
    return this.getLang(ELanguage.ru);
  }

  get uk() {
    return this.getLang(ELanguage.uk);
  }

  private save(lang: ELanguage) {
    const language = this.languages.find((lng) => lng.name === lang);
    if (!language) {
      throw new Error(`Add ${lang} to the db`);
    }
    this.langs[lang] = language;
    return this.langs[lang];
  }

  private getLang(name: ELanguage) {
    if (this.langs[name]) {
      return this.langs[name];
    }
    return this.save(name);
  }
}
