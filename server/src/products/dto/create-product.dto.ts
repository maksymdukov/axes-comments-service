import {
  IsArray,
  IsBoolean,
  IsLowercase,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  ruTitle: string;

  @IsNotEmpty()
  @IsString()
  ukTitle: string;

  @IsNotEmpty()
  @IsString()
  ruDescription: string;

  @IsNotEmpty()
  @IsString()
  ukDescription: string;

  @IsNotEmpty()
  @IsString()
  ruLongDescription: string;

  @IsNotEmpty()
  @IsString()
  ukLongDescription: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsBoolean()
  isFeatured: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @IsNotEmpty()
  @IsString()
  @IsLowercase()
  slug: string;

  @IsNotEmpty()
  @IsNumber()
  mainImageId: number;

  @IsNotEmpty({ each: true })
  @IsArray()
  @IsNumber({}, { each: true })
  imageIds: number[];
}
