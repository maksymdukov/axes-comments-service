import { IsEnum, IsOptional } from 'class-validator';
import { ESortOrder } from 'src/utils/filters/filters.enum';
import { PaginationDto } from 'src/utils/pagination/pagination.dto';
import { EProductSort } from '../enums/product-sort.enum';

export class GetAdminProductsDto extends PaginationDto {
  @IsOptional()
  featured: string | undefined;

  isFeatured: boolean;

  @IsOptional()
  active: string | undefined;

  isActive: boolean;

  @IsOptional()
  @IsEnum(EProductSort)
  sort: EProductSort;

  @IsOptional()
  @IsEnum(ESortOrder)
  order: ESortOrder = ESortOrder.desc;
}
