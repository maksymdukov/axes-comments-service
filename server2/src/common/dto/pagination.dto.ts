import { IsInt, Min, Max, IsNumberString, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  page: string;
  @IsOptional()
  size: string;
  skip = 0;
  limit = 10;

  get pageN() {
    return +this.page;
  }
  get sizeN() {
    return +this.size;
  }
}
