import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthRoleGuard } from 'src/auth/auth.guard';
import { JwtAuth } from 'src/auth/decorators/jwt-auth.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserRoles } from 'src/users/enums/roles.enum';
import { PaginatedQuery } from 'src/utils/pagination/paginated-query.decorator';
import { CommentsService } from './comments.service';
import { GetCommentsDto } from './dto/get-comments.dto';
import { UpdateCommentStatusDto } from './dto/update-comment-status.dto';

@Controller('/api/admin/comments')
@JwtAuth(UserRoles.admin)
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
