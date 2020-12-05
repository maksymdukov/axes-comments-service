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
import { CreateDeliveryDto } from 'src/delivery/dto/create-delivery.dto';
import { EOrderStatus } from '../enums/order-status.enum';
import { OrderItemDto } from './order-item.dto';

export class ChangeAnonymousOrderDto extends CreateDeliveryDto {
  @IsNotEmpty()
  @IsEnum(EOrderStatus)
  status: EOrderStatus;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
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
