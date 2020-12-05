import { Injectable } from '@nestjs/common';
import { PaginationDto } from './pagination.dto';

@Injectable()
export class PaginationService {
  paginateOutput([items, total]: [any, number], paginationDto: PaginationDto) {
    return {
      items,
      total,
      size: paginationDto.sizeN,
      page: paginationDto.pageN,
    };
  }
}
