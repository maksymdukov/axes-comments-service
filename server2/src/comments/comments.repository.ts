import { PaginationDto } from 'src/utils/pagination/pagination.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { GetCommentsDto } from './dto/get-comments.dto';
import { CommentStatus } from './enums/comment-status.enum';

@EntityRepository(Comment)
export class CommentsRepository extends Repository<Comment> {
  findComments(getCommentsDto: GetCommentsDto) {
    const { status, skip, limit } = getCommentsDto;
    const where = getCommentsDto.status ? { where: { status } } : {};
    return this.findAndCount({
      relations: ['product', 'anonymousUser', 'user'],
      ...where,
      skip,
      take: limit,
    });
  }

  findCommentsBySlug(slug: string, paginationDto: PaginationDto) {
    const { limit, skip } = paginationDto;
    return this.createQueryBuilder('comments')
      .leftJoinAndSelect('comments.product', 'product')
      .leftJoinAndSelect('comments.anonymousUser', 'user')
      .where('comments.slugId = :slug', { slug })
      .andWhere('comments.status = :status', { status: CommentStatus.approved })
      .limit(limit)
      .skip(skip)
      .getManyAndCount();
  }
}
