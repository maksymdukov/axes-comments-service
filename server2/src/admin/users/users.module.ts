import { Module } from '@nestjs/common';
import { CommonUsersModule } from 'src/common/users/users.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [CommonUsersModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
