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
    user.profile.phone = phone ?? user.profile.phone;
    user.profile.firstName = firstName ?? user.profile.firstName;
    user.profile.lastName = lastName ?? user.profile.lastName;
    user.profile.middleName = middleName ?? user.profile.middleName;

    return this.anonymousUserRepository.save(user);
  }
}
