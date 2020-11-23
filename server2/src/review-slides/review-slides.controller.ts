import { Controller, Get } from '@nestjs/common';
import { PaginatedQuery } from 'src/utils/pagination/paginated-query.decorator';
import { PaginationDto } from 'src/utils/pagination/pagination.dto';
import { ReviewSlidesService } from './review-slides.service';

@Controller('/api/v1/review-slides')
export class ReviewSlidesController {
  constructor(private reviewSlidesService: ReviewSlidesService) {}

  @Get()
  getReviewSlides(@PaginatedQuery() paginationDto: PaginationDto) {
    return this.reviewSlidesService.getSlides(paginationDto);
  }
}
