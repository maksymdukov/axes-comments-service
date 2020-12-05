import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRoles } from 'src/users/enums/roles.enum';
import { AuthRoleGuard } from '../auth.guard';
import { Roles } from './roles.decorator';

export function JwtAuth(...roles: UserRoles[]) {
  return applyDecorators(
    Roles(...roles),
    UseGuards(AuthGuard('jwt'), AuthRoleGuard),
  );
}
