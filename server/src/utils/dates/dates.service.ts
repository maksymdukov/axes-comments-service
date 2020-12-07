import { Injectable } from '@nestjs/common';

@Injectable()
export class DatesService {
  diffInDays(date1: Date, date2: Date) {
    return (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24);
  }
}
