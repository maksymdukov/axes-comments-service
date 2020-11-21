import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { paginatedOutput } from 'src/common/utils/paginated-output.utils';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUsers(pagination: PaginationDto) {
    const [items, total] = await this.usersRepository.findAndCount({
      skip: pagination.skip,
      take: pagination.limit,
    });
    return paginatedOutput(items, total, pagination);
  }
}
