import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateSlideDto } from './dto/create-slide.dto';
import { SlidesService } from './slides.service';

@Controller('/api/admin/slides')
export class SlidesAdminController {
  constructor(private slidesService: SlidesService) {}

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
