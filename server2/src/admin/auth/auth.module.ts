import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AdminAuthService } from './admin-auth.service';
import { CommonAuthModule } from '../../common/auth/auth.module';

@Module({
  imports: [ConfigModule, PassportModule, CommonAuthModule],
  controllers: [AuthController],
  providers: [AdminAuthService],
})
export class AuthModule {}
