import { Global, Module } from '@nestjs/common';
import { DatesService } from './dates/dates.service';
import { PaginationService } from './pagination/pagination.service';

@Global()
@Module({
  providers: [PaginationService, DatesService],
  exports: [PaginationService, DatesService],
  imports: [],
})
export class UtilsModule {}
