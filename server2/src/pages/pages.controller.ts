import { Controller, Get, Param } from '@nestjs/common';
import { PagesService } from './pages.service';

@Controller('/api/v1/pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get(':id')
  findOne(@Param('name') name: string) {
    return this.pagesService.findOne(name);
  }
}
