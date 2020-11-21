import {
  Body,
  Controller,
  Get,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthRoleGuard } from '../../common/auth/auth.guard';
import { Roles } from 'src/common/auth/decorators/roles.decorator';
import { UserRoles } from 'src/common/users/enums/roles.enum';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationPipe } from 'src/common/pipes/transform-pagination.pipe';
import { PaginatedQuery } from 'src/common/decorators/paginated-query.decorator';

@Controller('/api/admin/users')
// @Roles(UserRoles.admin)
// @UseGuards(AuthRoleGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(@PaginatedQuery() pagination: PaginationDto) {
    return this.usersService.getUsers(pagination);
  }
}
