import { PaginationDto } from 'src/utils/pagination/pagination.dto';
import { EntityRepository, Repository } from 'typeorm';
import { GetImagesAdminDto } from './dto/get-images-admin.dto';
import { Image } from './image.entity';

@EntityRepository(Image)
export class ImageRepository extends Repository<Image> {
  async findImages(getImagesAdminDto: GetImagesAdminDto) {
    const { skip, limit, isAdmin } = getImagesAdminDto;

    const qb = this.createQueryBuilder('image')
      .leftJoinAndSelect('image.languages', 'imagelanguage')
      .innerJoinAndSelect('imagelanguage.language', 'lang')
      .orderBy('image.createdAt', 'DESC')
      .take(limit)
      .skip(skip);

    if (isAdmin) {
      qb.where('image.isAdmin = :isAdmin', { isAdmin });
    }

    return qb.getManyAndCount();
  }
}
