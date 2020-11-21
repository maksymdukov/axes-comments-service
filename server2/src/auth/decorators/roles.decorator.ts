import { SetMetadata } from '@nestjs/common';
import { UserRoles } from 'src/users/enums/roles.enum';

export const Roles = (...roles: UserRoles[]) => SetMetadata('roles', roles);
