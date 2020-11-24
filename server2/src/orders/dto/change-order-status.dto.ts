import { IsEnum, IsNotEmpty } from 'class-validator';
import { EOrderStatus } from '../enums/order-status.enum';

export class ChangeOrderStatusDto {
  @IsNotEmpty()
  @IsEnum(EOrderStatus)
  status: EOrderStatus;
}
