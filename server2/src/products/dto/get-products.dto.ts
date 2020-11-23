import { IsOptional } from 'class-validator';
import { PaginationDto } from 'src/utils/pagination/pagination.dto';

export class GetProductsDto extends PaginationDto {
  @IsOptional()
  featured: string;

  isFeatured: boolean;
}
