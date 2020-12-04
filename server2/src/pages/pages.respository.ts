import { EntityRepository, Repository } from 'typeorm';
import { Page } from './entities/page.entity';
import {} from '@nestjs/mapped-types';
import { GetPageDto } from './dto/get-page.dto';

@EntityRepository(Page)
export class PagesRepository extends Repository<Page> {
  async getOneByName(name: string, getPageDto: GetPageDto) {
    const { locale } = getPageDto;
    const qb = this.createQueryBuilder('page')
      .leftJoinAndSelect('page.languages', 'pagelanguages')
      .innerJoinAndSelect('pagelanguages.language', 'pagelanguage')
      .where('page.name = :name', {
        name,
      });

    if (locale) {
      qb.andWhere('pagelanguage.name = :locale', { locale });
    }
    return qb.getOne();
  }
}
