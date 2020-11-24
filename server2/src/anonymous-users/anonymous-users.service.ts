import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial } from 'typeorm';
import { AnonymousUser } from './anonymous-user.entity';
import { AnonymousUserRepository } from './anonymous-user.repository';
import { ChangeAnonymousUserDto } from './dto/change-anonymous-user.dto';

@Injectable()
export class AnonymousUsersService {
  constructor(
    @InjectRepository(AnonymousUser)
    private anonymousUserRepository: AnonymousUserRepository,
  ) {}

  async create(anonUser: DeepPartial<AnonymousUser>): Promise<AnonymousUser> {
    const anonymousUser = this.anonymousUserRepository.create(anonUser);
    return this.anonymousUserRepository.save(anonymousUser);
  }

  async change(id: number, changeAnonUserDto: ChangeAnonymousUserDto) {
    const { email, middleName, lastName, firstName, phone } = changeAnonUserDto;
    const user = await this.anonymousUserRepository.findOneOrFail(id);
    user.email = email ?? user.email;
    user.phone = phone ?? user.phone;
    user.firstName = firstName ?? user.firstName;
    user.lastName = lastName ?? user.lastName;
    user.middleName = middleName ?? user.middleName;

    return this.anonymousUserRepository.save(user);
  }
}
