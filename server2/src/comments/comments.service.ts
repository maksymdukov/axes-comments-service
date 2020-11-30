import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnonymousUserRepository } from 'src/anonymous-users/anonymous-user.repository';
import { ProductRepository } from 'src/products/product.repository';
import { PaginationDto } from 'src/utils/pagination/pagination.dto';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { CommentsRepository } from './comments.repository';
import { CreateAnonCommentDto } from './dto/create-anon-comment.dto';
import { GetCommentsDto } from './dto/get-comments.dto';
import { UpdateCommentStatusDto } from './dto/update-comment-status.dto';

@Injectable()
export class CommentsService {
  constructor(
    private pagionationService: PaginationService,
    @InjectRepository(CommentsRepository)
    private commentsRepository: CommentsRepository,
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
    @InjectRepository(AnonymousUserRepository)
    private anonymousUsersRepository: AnonymousUserRepository,
  ) {}

  async createAnonymousComment(createAnonCommentDto: CreateAnonCommentDto) {
    const { email, firstName, rating, content, slug } = createAnonCommentDto;
    const anonymousUser = this.anonymousUsersRepository.create({
      email,
      profile: { firstName },
    });
    const [anonUser, product] = await Promise.all([
      this.anonymousUsersRepository.save(anonymousUser),
      this.productRepository.findProductBySlug(slug, {}),
    ]);
    const comment = this.commentsRepository.create({
      product,
      rating,
      content,
      anonymousUser: anonUser,
    });

    return this.commentsRepository.save(comment);
  }

  async deleteComment(id: number) {
    const comment = await this.commentsRepository.findOneOrFail(id);
    return this.commentsRepository.remove(comment);
  }

  async updateCommentStatus(
    id: number,
    updateCommentStatusDto: UpdateCommentStatusDto,
  ) {
    const comment = await this.commentsRepository.findOneOrFail(id);
    comment.status = updateCommentStatusDto.status;
    return this.commentsRepository.save(comment);
  }

  async getComments(getCommentsDto: GetCommentsDto) {
    return this.pagionationService.paginateOutput(
      await this.commentsRepository.findComments(getCommentsDto),
      getCommentsDto,
    );
  }

  async getCommentsBySlug(slug: string, paginationDto: PaginationDto) {
    return this.pagionationService.paginateOutput(
      await this.commentsRepository.findCommentsBySlug(slug, paginationDto),
      paginationDto,
    );
  }
}
