import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnonymousUser } from './anonymous-user.entity';
import { AnonymousUserRepository } from './anonymous-user.repository';

@Injectable()
export class AnonymousUsersService {
  constructor(
    @InjectRepository(AnonymousUser)
    private anonymousUserRepository: AnonymousUserRepository,
  ) {}
}
