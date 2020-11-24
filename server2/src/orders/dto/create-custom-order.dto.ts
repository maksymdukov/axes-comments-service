import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCustomOrderDto {
  @IsNotEmpty()
  @IsNumber()
  deliveryId: number;

  @IsOptional()
  @IsString()
  comment: string;

  files: Express.Multer.File[];
}
