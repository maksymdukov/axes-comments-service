import {
  IsArray,
  IsLowercase,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  longDescription: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  @IsLowercase()
  slug: string;

  @IsNotEmpty({ each: true })
  @IsArray()
  @IsNumber(null, { each: true })
  imageIds: number[];
}
