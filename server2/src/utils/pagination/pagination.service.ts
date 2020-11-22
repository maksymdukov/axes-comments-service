import { Injectable } from '@nestjs/common';
import { PaginationDto } from './pagination.dto';

@Injectable()
export class PaginationService {
  paginateOutput(items: any, total: number, paginationDto: PaginationDto) {
    return {
      items,
      total,
      size: paginationDto.sizeN,
      page: paginationDto.pageN,
    };
  }
}
