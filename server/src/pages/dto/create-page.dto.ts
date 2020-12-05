import { IsString } from 'class-validator';

export class CreatePageDto {
  @IsString()
  name: string;

  @IsString()
  ruContent: string;

  @IsString()
  ukContent: string;
}
