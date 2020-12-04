import { IsEnum, IsOptional } from 'class-validator';
import { ELanguage } from 'src/language/languages.enum';

export class GetPageDto {
  @IsOptional()
  @IsEnum(ELanguage)
  locale?: ELanguage;
}
