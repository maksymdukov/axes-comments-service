import { IsEnum, IsOptional } from 'class-validator';
import { ELanguage } from 'src/language/languages.enum';

export class FindSettlementsDto {
  @IsOptional()
  query: string;

  @IsEnum(ELanguage)
  locale: ELanguage;
}
