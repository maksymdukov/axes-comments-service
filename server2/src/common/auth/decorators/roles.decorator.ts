import { SetMetadata } from '@nestjs/common';
import { UserRoles } from 'src/common/users/enums/roles.enum';

export const Roles = (...roles: UserRoles[]) => SetMetadata('roles', roles);
