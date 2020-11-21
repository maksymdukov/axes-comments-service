import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from '../users/entities/user.entity';
import { UserRoles } from '../users/enums/roles.enum';

@Injectable()
export class AuthRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    if (!req.user) {
      throw new UnauthorizedException();
    }
    let roles = this.reflector.getAllAndOverride<UserRoles[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) {
      roles = [UserRoles.customer];
    }
    return this.matchRole(req.user, roles);
  }

  matchRole(user: User, roles: UserRoles[]) {
    return !!user.roles.find((role) => roles.includes(role));
  }
}
