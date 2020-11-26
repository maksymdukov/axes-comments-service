import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendPmDto {
  @IsNotEmpty()
  @IsString()
  fistName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
