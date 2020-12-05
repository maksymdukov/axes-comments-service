import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateDeliveryDto } from 'src/delivery/dto/create-delivery.dto';
import { EOrderStatus } from '../enums/order-status.enum';

export class ChangeAnonymousCustomOrderDto extends CreateDeliveryDto {
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
}
