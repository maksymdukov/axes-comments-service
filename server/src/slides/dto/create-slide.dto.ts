import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSlideDto {
  @IsNotEmpty()
  @IsInt()
  bigImageId: number;

  @IsNotEmpty()
  @IsInt()
  smallImageId: number;

  @IsOptional()
  @IsNotEmpty()
  name?: string;
}
