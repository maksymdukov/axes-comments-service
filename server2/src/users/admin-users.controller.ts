import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { PaginationDto } from 'src/utils/pagination/pagination.dto';
import { PaginatedQuery } from 'src/utils/pagination/paginated-query.decorator';

@Controller('/api/admin/users')
// @Roles(UserRoles.admin)
// @UseGuards(AuthRoleGuard)
export class AdminUsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(@PaginatedQuery() pagination: PaginationDto) {
    return this.usersService.getUsers(pagination);
  }
}
