import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { OrderItemDto } from './order-item.dto';

export class CreateOrderDto {
  @IsOptional()
  @IsString()
  comment: string;

  @IsInt()
  deliveryId: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  items: OrderItemDto[];
}
