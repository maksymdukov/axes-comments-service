import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/utils/pagination/pagination.dto';
import { CommentStatus } from '../enums/comment-status.enum';

export class GetCommentsDto extends PaginationDto {
  @IsOptional()
  @IsEnum(CommentStatus)
  status?: CommentStatus;
}
