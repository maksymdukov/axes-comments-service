import { PaginationDto } from 'src/utils/pagination/pagination.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Slide } from './slide.entity';

@EntityRepository(Slide)
export class SlidesRepository extends Repository<Slide> {
  async findSlides(paginationDto: PaginationDto) {
    const { limit, skip } = paginationDto;
    return this.createQueryBuilder('slides')
      .leftJoinAndSelect('slides.bigImage', 'bigimage')
      .innerJoinAndSelect('bigimage.languages', 'bigimglang')
      .leftJoinAndSelect('slides.smallImage', 'smallimage')
      .innerJoinAndSelect('smallimage.languages', 'smallimglang')
      .where('bigimglang.name = :locale', { locale: paginationDto.locale })
      .andWhere('smallimglang.name = :locale', { locale: paginationDto.locale })
      .orderBy('slides.createdAt', 'DESC')
      .take(limit)
      .skip(skip)
      .getManyAndCount();
  }
}
