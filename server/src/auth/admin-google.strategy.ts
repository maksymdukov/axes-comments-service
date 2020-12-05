import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { UsersService } from 'src/users/users.service';
import { ApiConfigService } from '../api-config/api-config.service';

@Injectable()
export class AdminGoogleStrategy extends PassportStrategy(
  Strategy,
  'admin-google',
) {
  userService: UsersService;
  constructor(apiConfigService: ApiConfigService, userService: UsersService) {
    const { googleClientId, googleClientSecret } = apiConfigService.config.auth;
    super({
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: `${apiConfigService.config.server.apiUrl}/api/admin/auth/google-callback`,
      scope: ['email', 'profile'],
    });
    this.userService = userService;
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    const { emails } = profile;
    // const user = {
    //   email: emails[0].value,
    //   firstName: name.givenName,
    //   lastName: name.familyName,
    //   picture: photos[0].value,
    //   accessToken,
    // };
    if (!emails || !emails.length) {
      return;
    }
    const user = await this.userService.getOneByEmail(emails[0].value);
    return user;
  }
}
