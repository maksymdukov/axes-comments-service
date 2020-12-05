import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateDeliveryDto } from 'src/delivery/dto/create-delivery.dto';
import { OrderItemDto } from './order-item.dto';

export class CreateAnonymousOrderDto extends CreateDeliveryDto {
  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  middleName: string;

  @IsOptional()
  @IsString()
  comment: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  items: OrderItemDto[];
}
