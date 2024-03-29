import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ApiConfigService } from '../api-config/api-config.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(apiConfigService: ApiConfigService) {
    const { googleClientId, googleClientSecret } = apiConfigService.config.auth;
    super({
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: 'http://localhost:3000/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    // TODO
    // Go to DB and fetch user
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
