import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { ApiConfigService } from 'src/api-config/api-config.service';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { AdminAuthService } from './admin-auth.service';

@Controller('api/admin/auth')
export class AdminAuthController {
  constructor(
    private adminAuthService: AdminAuthService,
    private apiConfigService: ApiConfigService,
  ) {}

  @Get('google-start')
  @UseGuards(AuthGuard('admin-google'))
  async googleStart() {}

  @Get('google-callback')
  @UseGuards(AuthGuard('admin-google'))
  async googleCallback(@GetUser() user: User, @Res() res: Response) {
    const jwt = await this.adminAuthService.generateJWT(user);
    const redirectUrl = `${this.apiConfigService.config.server.apiUrl}/login#token=${jwt}`;
    return res.redirect(redirectUrl);
  }
}
