import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { PaginationDto } from '../dto/pagination.dto';

export class PaginationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    value.size = value.size || '10';
    value.page = value.page || '1';
    const { size, page } = value;
    const psize = parseInt(size);
    const ppage = parseInt(page);
    if (isNaN(psize) || isNaN(ppage)) {
      throw new BadRequestException('page and size must be a number');
    }

    if (psize > 500 || psize < 1) {
      throw new BadRequestException('size must be < 500 and > 0');
    }

    if (ppage < 1) {
      throw new BadRequestException('page must be > 0');
    }

    value.limit = psize;
    value.skip = (ppage - 1) * psize;
    return value;
  }
}
