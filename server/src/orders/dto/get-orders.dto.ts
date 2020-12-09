import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/utils/pagination/pagination.dto';
import { EOrderStatus } from '../enums/order-status.enum';

export class GetOrdersDto extends PaginationDto {
  @IsOptional()
  @IsEnum(EOrderStatus)
  status: EOrderStatus;
}
