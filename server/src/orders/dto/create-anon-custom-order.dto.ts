import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateDeliveryDto } from 'src/delivery/dto/create-delivery.dto';

export class CreateAnonymousCustomOrder extends CreateDeliveryDto {
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

  files: Express.Multer.File[];
}
