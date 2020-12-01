import { Controller, Get } from '@nestjs/common';
import { FrontendService } from './frontend.service';

@Controller('/api/admin/frontend')
export class FrontendController {
  constructor(private feService: FrontendService) {}

  @Get('rebuild')
  rebuildFrontend() {
    return this.feService.rebuild();
  }
}
