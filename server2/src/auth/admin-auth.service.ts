import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { JWTPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AdminAuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: IGoogleUser) {
    // go to User repository
    // see if user is there
  }

  async generateJWT(user: User) {
    const payload: JWTPayload = {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };
    return this.jwtService.signAsync(payload);
  }
}
