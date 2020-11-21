import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('api/admin/auth')
export class AuthController {
  @Get('google-start')
  @UseGuards(AuthGuard('admin-google'))
  async googleStart() {}

  @Get('google-callback')
  @UseGuards(AuthGuard('admin-google'))
  async googleCallback(@GetUser() user) {
    console.log(user);
    return { boo: 'boo' };
  }
}
