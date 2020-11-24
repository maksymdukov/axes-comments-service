import { IsEnum, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { EDelivery } from '../delivery.enum';

export class CreateDeliveryDto {
  @IsEnum(EDelivery)
  delivery: EDelivery;

  @IsOptional()
  @IsString()
  npSettlement: string;

  @IsOptional()
  @IsNumber()
  npNumber: number;

  @IsOptional()
  @IsString()
  ukrAddress: string;

  @IsOptional()
  @IsString()
  ukrIdx: number;

  @IsOptional()
  @IsInt()
  userId: number;
}
