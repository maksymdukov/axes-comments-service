import { Injectable } from '@nestjs/common';

const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

@Injectable()
export class DatesService {
  diffInDays(date1: Date, date2: Date) {
    return (date2.getTime() - date1.getTime()) / DAY_IN_MILLISECONDS;
  }
}
