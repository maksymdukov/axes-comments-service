import { PaginationDto } from 'src/utils/pagination/pagination.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Image } from './image.entity';

@EntityRepository(Image)
export class ImageRepository extends Repository<Image> {
  async findImages(paginationDto: PaginationDto) {
    const { skip, limit } = paginationDto;

    return this.createQueryBuilder('image')
      .leftJoinAndSelect('image.languages', 'imagelanguage')
      .innerJoinAndSelect('imagelanguage.language', 'lang')
      .orderBy('image.createdAt', 'DESC')
      .take(limit)
      .skip(skip)
      .getManyAndCount();
  }
}
