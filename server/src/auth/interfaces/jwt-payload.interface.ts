import { UserRoles } from 'src/users/enums/roles.enum';

export interface JWTPayload {
  id: number;
  email: string;
  roles: UserRoles[];
}
