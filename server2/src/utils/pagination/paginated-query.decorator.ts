import { PipeTransform, Query, Type } from '@nestjs/common';
import { PaginationPipe } from './transform-pagination.pipe';

export const PaginatedQuery = (
  ...pipes: (Type<PipeTransform> | PipeTransform)[]
) => Query(PaginationPipe, ...pipes);
