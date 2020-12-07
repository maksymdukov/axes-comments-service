import { IsEnum } from 'class-validator';
import { ELanguage } from 'src/language/languages.enum';

export class GetWarehousesDto {
  @IsEnum(ELanguage)
  locale: ELanguage;
}
