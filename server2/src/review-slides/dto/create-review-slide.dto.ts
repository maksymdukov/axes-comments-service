import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateReviewSlideDto {
  @IsNotEmpty()
  @IsInt()
  imageId: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}
