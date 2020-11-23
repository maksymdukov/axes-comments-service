import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PaginatedQuery } from 'src/utils/pagination/paginated-query.decorator';
import { PaginationDto } from 'src/utils/pagination/pagination.dto';
import { CommentsService } from './comments.service';
import { CreateAnonCommentDto } from './dto/create-anon-comment.dto';

@Controller('/api/v1/comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get(':slug')
  getCommentBySlug(
    @Param('slug') slug: string,
    @PaginatedQuery() pagionationDto: PaginationDto,
  ) {
    return this.commentsService.getCommentsBySlug(slug, pagionationDto);
  }

  @Post()
  createAnonComment(@Body() createCommentDto: CreateAnonCommentDto) {
    return this.commentsService.createAnonymousComment(createCommentDto);
  }
}
