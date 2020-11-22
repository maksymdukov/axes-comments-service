import { PaginationDto } from '../../utils/pagination/pagination.dto';

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
