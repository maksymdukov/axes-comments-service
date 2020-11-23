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
import { CreateReviewSlideDto } from './dto/create-review-slide.dto';
import { ReviewSlidesService } from './review-slides.service';

@Controller('/api/admin/review-slides')
export class ReviewSlidesAdmin {
  constructor(private reviewSlidesService: ReviewSlidesService) {}

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
