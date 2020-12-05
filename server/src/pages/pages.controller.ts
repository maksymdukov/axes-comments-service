import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetPageDto } from './dto/get-page.dto';
import { PagesService } from './pages.service';

@Controller('/api/v1/pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get(':name')
  findOne(@Param('name') name: string, @Query() getPageDto: GetPageDto) {
    return this.pagesService.findOneByName(name, getPageDto);
  }
}
