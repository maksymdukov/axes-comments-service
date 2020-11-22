import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthConfig } from 'src/config/config.interface';
import { ApiConfigService } from '../api-config/api-config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(apiConfigService: ApiConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
      ignoreExpiration: false,
      secretOrKey: apiConfigService.config.auth.jwtKey,
    });
  }

  async validate(payload: any) {
    // TODO
    // return user from DB
    return {};
  }
}
