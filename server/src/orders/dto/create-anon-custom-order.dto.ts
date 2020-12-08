import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { EDelivery } from 'src/delivery/delivery.enum';

export class CreateAnonymousCustomOrder {
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

  @IsNotEmpty()
  @IsEnum(EDelivery)
  delivery: EDelivery;

  @IsOptional()
  @IsString()
  npSettlement: string;

  @IsOptional()
  @IsString()
  npBranch: string;

  @IsOptional()
  @IsString()
  ukrAddress: string;

  @IsOptional()
  @IsNumberString()
  @Type(() => Number)
  ukrIdx: number;

  files: Express.Multer.File[];
}
