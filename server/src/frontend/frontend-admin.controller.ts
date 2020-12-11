import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Patch,
} from '@nestjs/common';
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

  @Get('build')
  async getLastBuilds() {
    return this.feService.getLastBuilds();
  }

  @Patch('build/:id')
  async cancelBuild(@Param('id') buildId: string) {
    if (!buildId) throw new BadRequestException('id is missing');
    return this.feService.cancelBuild(buildId);
  }
}
