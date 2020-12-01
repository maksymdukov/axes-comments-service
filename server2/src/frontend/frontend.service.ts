import { Injectable } from '@nestjs/common';
import { SsgService } from 'src/integrations/ssg/ssg.service';

@Injectable()
export class FrontendService {
  constructor(private ssgService: SsgService) {}

  rebuild() {
    return this.ssgService.rebuild();
  }
}
