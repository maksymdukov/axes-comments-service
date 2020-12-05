import { IsBooleanString, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/utils/pagination/pagination.dto';

export class GetImagesAdminDto extends PaginationDto {
  @IsOptional()
  @IsBooleanString()
  isAdmin?: string;
}
