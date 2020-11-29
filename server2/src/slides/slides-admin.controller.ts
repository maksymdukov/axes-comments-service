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
import { PaginatedQuery } from 'src/utils/pagination/paginated-query.decorator';
import { PaginationDto } from 'src/utils/pagination/pagination.dto';
import { CreateSlideDto } from './dto/create-slide.dto';
import { SlidesService } from './slides.service';

@Controller('/api/admin/slides')
export class SlidesAdminController {
  constructor(private slidesService: SlidesService) {}

  @Get()
  getSlides(@PaginatedQuery() paginationDto: PaginationDto) {
    return this.slidesService.getSlides(paginationDto);
  }

  @Post()
  createSlide(@Body() createSlideDto: CreateSlideDto) {
    return this.slidesService.createSlide(createSlideDto);
  }

  @Delete(':id')
  deleteSlide(@Param('id', ParseIntPipe) id: number) {
    return this.slidesService.deleteSlide(id);
  }

  @Patch(':id')
  updateSlide(
    @Body() updateSlideDto: CreateSlideDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.slidesService.updateSlide(id, updateSlideDto);
  }
}
