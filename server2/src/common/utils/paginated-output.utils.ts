import { PaginationDto } from '../dto/pagination.dto';

export const paginatedOutput = (
  items: any,
  total: number,
  paginationDto: PaginationDto,
) => ({
  items,
  total,
  size: paginationDto.sizeN,
  page: paginationDto.pageN,
});
