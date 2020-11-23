import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnonymousUserRepository } from './anonymous-user.repository';
import { AnonymousUsersService } from './anonymous-users.service';

@Module({
  imports: [TypeOrmModule.forFeature([AnonymousUserRepository])],
  providers: [AnonymousUsersService],
})
export class AnonymousUsersModule {}
