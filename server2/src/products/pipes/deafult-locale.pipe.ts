import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { ELanguage } from 'src/language/languages.enum';

export class DefaultLocaleTransform implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    value.locale ||= ELanguage.uk;
    return value;
  }
}
