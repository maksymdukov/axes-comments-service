import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/utils/pagination/pagination.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { PaginationService } from 'src/utils/pagination/pagination.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private paginationService: PaginationService,
  ) {}

  async getUsers(pagination: PaginationDto) {
    const [items, total] = await this.usersRepository.findAndCount({
      skip: pagination.skip,
      take: pagination.limit,
    });
    return this.paginationService.paginateOutput(items, total, pagination);
  }
}
