import { Controller, Get } from '@nestjs/common';
import { JwtAuth } from 'src/auth/decorators/jwt-auth.decorator';
import { UserRoles } from 'src/users/enums/roles.enum';
import { FrontendService } from './frontend.service';

@Controller('/api/admin/frontend')
@JwtAuth(UserRoles.admin)
export class FrontendController {
  constructor(private feService: FrontendService) {}

  @Get('rebuild')
  async rebuildFrontend() {
    await this.feService.rebuild();
    return;
  }
}
