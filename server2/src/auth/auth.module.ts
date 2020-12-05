import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { ApiConfigService } from '../api-config/api-config.service';
import { AdminAuthController } from './admin-auth.controller';
import { AdminAuthService } from './admin-auth.service';
import { AdminGoogleStrategy } from './admin-google.strategy';
import { JWT_EXPIRES_IN } from './auth.constants';
import { GoogleStrategy } from './google.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ApiConfigService],
      useFactory: (apiConfigService: ApiConfigService) => ({
        // secret: apiConfigService.config.auth.jwtKey,
        signOptions: { expiresIn: JWT_EXPIRES_IN },
      }),
    }),
  ],
  controllers: [AdminAuthController],
  providers: [
    JwtStrategy,
    GoogleStrategy,
    AdminGoogleStrategy,
    AdminAuthService,
  ],
})
export class AuthModule {}
