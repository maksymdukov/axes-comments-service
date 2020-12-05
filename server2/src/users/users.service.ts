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
    return this.paginationService.paginateOutput(
      await this.usersRepository.findAndCount({
        skip: pagination.skip,
        take: pagination.limit,
      }),
      pagination,
    );
  }

  async getOne(id: number) {
    return this.usersRepository.findOne(id);
  }

  async getOneByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }
}
