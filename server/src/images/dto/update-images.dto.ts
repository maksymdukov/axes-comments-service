import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ELanguage } from 'src/language/languages.enum';

export class UpdateImagesDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => UpdateTitleDto)
  images: UpdateTitleDto[];
}

export class UpdateTitleDto {
  @IsInt()
  id: number;

  @IsString()
  @IsEnum(ELanguage)
  language: ELanguage;

  @IsString()
  @IsNotEmpty()
  title: string;
}
