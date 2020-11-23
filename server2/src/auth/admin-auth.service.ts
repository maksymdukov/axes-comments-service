import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminAuthService {
  async login(user: IGoogleUser) {
    // go to User repository
    // see if user is there
  }
}
