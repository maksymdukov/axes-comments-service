import { ArrayMaxSize, ArrayMinSize, IsArray, IsInt } from 'class-validator';

export class DeleteImagesDto {
  @IsArray()
  @IsInt({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  ids: number[];
}
