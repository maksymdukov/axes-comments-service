import { IsEnum } from 'class-validator';
import { CommentStatus } from '../enums/comment-status.enum';

export class UpdateCommentStatusDto {
  @IsEnum(CommentStatus)
  status: CommentStatus;
}
