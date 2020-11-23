import { Controller } from '@nestjs/common';
import { PaginatedQuery } from 'src/utils/pagination/paginated-query.decorator';
import { PaginationDto } from 'src/utils/pagination/pagination.dto';
import { SlidesService } from './slides.service';

@Controller('/api/v1/slides')
export class SlidesController {
  constructor(private slidesService: SlidesService) {}

  async getSlides(@PaginatedQuery() paginationDto: PaginationDto) {
    return this.slidesService.getSlides(paginationDto);
  }
}
