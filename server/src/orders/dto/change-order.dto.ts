import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { EOrderStatus } from '../enums/order-status.enum';
import { OrderItemDto } from './order-item.dto';

export class ChangeOrderDto {
  @IsNotEmpty()
  @IsEnum(EOrderStatus)
  status: EOrderStatus;

  @IsOptional()
  @IsString()
  comment: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  items: OrderItemDto[];
}
