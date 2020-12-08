import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateAnonymousUserDto {
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
}
