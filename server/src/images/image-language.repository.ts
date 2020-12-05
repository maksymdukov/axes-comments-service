import { EntityRepository, Repository } from 'typeorm';
import { UpdateTitleDto } from './dto/update-images.dto';
import { ImageLanguage } from './image-language.entity';

@EntityRepository(ImageLanguage)
export class ImageLanguageRepository extends Repository<ImageLanguage> {
  async findImageLanguage(updateTitleDto: UpdateTitleDto) {
    return this.createQueryBuilder('imagelanguage')
      .leftJoinAndSelect('imagelanguage.language', 'language')
      .leftJoinAndSelect('imagelanguage.image', 'image')
      .where('image.id = :imgid', { imgid: updateTitleDto.id })
      .andWhere('language.name = :lngname', {
        lngname: updateTitleDto.language,
      })
      .getOneOrFail();
  }
}
