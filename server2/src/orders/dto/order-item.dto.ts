import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class OrderItemDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNotEmpty()
  @IsInt()
  count: number;
}
