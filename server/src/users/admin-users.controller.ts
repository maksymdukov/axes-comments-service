import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { PaginationDto } from 'src/utils/pagination/pagination.dto';
import { PaginatedQuery } from 'src/utils/pagination/paginated-query.decorator';
import { UserRoles } from './enums/roles.enum';
import { JwtAuth } from 'src/auth/decorators/jwt-auth.decorator';

@Controller('/api/admin/users')
@JwtAuth(UserRoles.admin)
export class AdminUsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(@PaginatedQuery() pagination: PaginationDto) {
    return this.usersService.getUsers(pagination);
  }
}
