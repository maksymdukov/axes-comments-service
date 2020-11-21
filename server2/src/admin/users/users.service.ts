import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { User } from 'src/common/users/entities/user.entity';
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
    return {
      items,
      total,
      size: pagination.sizeN,
      page: pagination.pageN,
    };
  }
}
