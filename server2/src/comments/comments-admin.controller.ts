import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { PaginatedQuery } from 'src/utils/pagination/paginated-query.decorator';
import { CommentsService } from './comments.service';
import { GetCommentsDto } from './dto/get-comments.dto';
import { UpdateCommentStatusDto } from './dto/update-comment-status.dto';

@Controller('/api/admin/comments')
export class CommentsAdminController {
  constructor(private commentsService: CommentsService) {}

  @Delete(':id')
  deleteComment(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.deleteComment(id);
  }

  @Get()
  getComments(@PaginatedQuery() getCommentsDto: GetCommentsDto) {
    return this.commentsService.getComments(getCommentsDto);
  }

  @Patch(':id')
  updateCommentStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentStatusDto: UpdateCommentStatusDto,
  ) {
    return this.commentsService.updateCommentStatus(id, updateCommentStatusDto);
  }
}
