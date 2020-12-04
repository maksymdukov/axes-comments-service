import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { ESortOrder } from 'src/utils/filters/filters.enum';
import { PaginationDto } from 'src/utils/pagination/pagination.dto';
import { EProductCondition } from '../enums/product-contition.enum';
import { EProductDirection } from '../enums/product-direction.enum';
import { EProductSort } from '../enums/product-sort.enum';

export class GetProductsDto extends PaginationDto {
  @IsOptional()
  featured: string | undefined;

  isFeatured: boolean;

  @IsOptional()
  @IsEnum(EProductSort)
  sort: EProductSort;

  @IsOptional()
  @IsEnum(ESortOrder)
  order: ESortOrder = ESortOrder.desc;

  @IsOptional()
  @IsEnum(EProductCondition)
  condition?: EProductCondition;

  @IsOptional()
  @IsEnum(EProductDirection)
  @IsEnum(EProductDirection)
  direction?: EProductDirection;

  @IsOptional()
  @IsDateString()
  date?: string;
}
