import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { EDelivery } from '../delivery.enum';

export class CreateDeliveryDto {
  @IsEnum(EDelivery)
  delivery: EDelivery;

  @IsOptional()
  @IsString()
  npSettlement: string;

  @IsOptional()
  @IsString()
  npSettlementId: string;

  @IsOptional()
  @IsString()
  npBranch: string;

  @IsOptional()
  @IsString()
  npBranchId: string;

  @IsOptional()
  @IsString()
  ukrAddress: string;

  @IsOptional()
  @IsString()
  ukrIdx: string;

  @IsOptional()
  @IsInt()
  userId?: number;
}
