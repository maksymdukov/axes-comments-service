import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { ApiConfigService } from '../api-config/api-config.service';
import { JWTPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    apiConfigService: ApiConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: apiConfigService.config.auth.jwtKey,
    });
  }

  async validate(payload: JWTPayload) {
    const user = this.usersService.getOne(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
