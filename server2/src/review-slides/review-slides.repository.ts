import { PaginationDto } from 'src/utils/pagination/pagination.dto';
import { EntityRepository, Repository } from 'typeorm';
import { ReviewSlide } from './review-slide.entity';

@EntityRepository(ReviewSlide)
export class ReviewSlidesRepository extends Repository<ReviewSlide> {
  findSlides(paginationDto: PaginationDto) {
    const { limit, skip, locale } = paginationDto;
    const qb = this.createQueryBuilder('reviewslides')
      .leftJoinAndSelect('reviewslides.image', 'image')
      .innerJoinAndSelect('image.languages', 'lang')
      .innerJoinAndSelect('lang.language', 'lng')
      .orderBy('reviewslides.updatedAt', 'DESC')
      .limit(limit)
      .skip(skip);
    if (locale) {
      qb.where('lng.name = :locale', { locale });
    }
    return qb.getManyAndCount();
  }

  findSlideById(id: number) {
    return this.createQueryBuilder('reviewslides')
      .leftJoinAndSelect('reviewslides.image', 'image')
      .innerJoinAndSelect('image.languages', 'lang')
      .innerJoinAndSelect('lang.language', 'lng')
      .where('reviewslides.id = :id', { id })
      .getOneOrFail();
  }
}
