import { PaginationDto } from 'src/utils/pagination/pagination.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Slide } from './slide.entity';

@EntityRepository(Slide)
export class SlidesRepository extends Repository<Slide> {
  async findSlides(paginationDto: PaginationDto) {
    const { limit, skip } = paginationDto;
    const qb = this.createQueryBuilder('slides')
      .leftJoinAndSelect('slides.bigImage', 'bigimage')
      .innerJoinAndSelect('bigimage.languages', 'bigimglang')
      .innerJoinAndSelect('bigimglang.language', 'bigimglng')
      .leftJoinAndSelect('slides.smallImage', 'smallimage')
      .innerJoinAndSelect('smallimage.languages', 'smallimglang')
      .innerJoinAndSelect('smallimglang.language', 'smallimglng')
      .orderBy('slides.updatedAt', 'DESC')
      .take(limit)
      .skip(skip);
    if (paginationDto.locale) {
      qb.where('bigimglng.name = :locale', {
        locale: paginationDto.locale,
      }).andWhere('smallimglng.name = :locale', {
        locale: paginationDto.locale,
      });
    }
    return qb.getManyAndCount();
  }
}
