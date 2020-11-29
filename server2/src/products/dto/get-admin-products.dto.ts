import { IsOptional } from 'class-validator';
import { PaginationDto } from 'src/utils/pagination/pagination.dto';

export class GetAdminProductsDto extends PaginationDto {
  @IsOptional()
  featured: string;

  @IsOptional()
  isFeatured: string | undefined;

  @IsOptional()
  isActive: string | undefined;
}
