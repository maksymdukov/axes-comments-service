import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentsAdminController } from './comments-admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnonymousUserRepository } from 'src/anonymous-users/anonymous-user.repository';
import { CommentsRepository } from './comments.repository';
import { ProductRepository } from 'src/products/product.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AnonymousUserRepository,
      CommentsRepository,
      ProductRepository,
    ]),
  ],
  providers: [CommentsService],
  controllers: [CommentsController, CommentsAdminController],
})
export class CommentsModule {}
