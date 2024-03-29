import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { JwtAuth } from 'src/auth/decorators/jwt-auth.decorator';
import { UserRoles } from 'src/users/enums/roles.enum';
import { PaginatedQuery } from 'src/utils/pagination/paginated-query.decorator';
import { PaginationDto } from 'src/utils/pagination/pagination.dto';
import { CreateReviewSlideDto } from './dto/create-review-slide.dto';
import { ReviewSlidesService } from './review-slides.service';

@Controller('/api/admin/review-slides')
@JwtAuth(UserRoles.admin)
export class ReviewSlidesAdmin {
  constructor(private reviewSlidesService: ReviewSlidesService) {}

  @Get()
  getReviewSlides(@PaginatedQuery() paginationDto: PaginationDto) {
    return this.reviewSlidesService.getSlides(paginationDto);
  }

  @Post()
  createReviewSlide(@Body() createSlideDto: CreateReviewSlideDto) {
    return this.reviewSlidesService.createSlide(createSlideDto);
  }

  @Patch(':id')
  updateReviewSlide(
    @Body() updateSlideDto: CreateReviewSlideDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.reviewSlidesService.updateSlide(id, updateSlideDto);
  }

  @Delete(':id')
  deleteReviewSlide(@Param('id', ParseIntPipe) id: number) {
    return this.reviewSlidesService.deleteSlide(id);
  }

  @Get(':id')
  getReviewSlideById(@Param('id', ParseIntPipe) id: number) {
    return this.reviewSlidesService.getSlideById(id);
  }
}
