import { IsOptional, IsEnum } from 'class-validator';
import { ELanguage } from 'src/language/languages.enum';

export class PaginationDto {
  @IsOptional()
  page: string;

  @IsOptional()
  size: string;

  @IsOptional()
  @IsEnum(ELanguage)
  locale: ELanguage | undefined;

  skip = 0;
  limit = 10;

  get pageN() {
    return +this.page;
  }
  get sizeN() {
    return +this.size;
  }
}
