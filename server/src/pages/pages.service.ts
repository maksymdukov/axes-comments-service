import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LanguageService } from 'src/language/language.service';
import { ELanguage } from 'src/language/languages.enum';
import { PaginationDto } from 'src/utils/pagination/pagination.dto';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { Repository } from 'typeorm';
import { CreatePageDto } from './dto/create-page.dto';
import { GetPageDto } from './dto/get-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { PageLanguage } from './entities/page-language.entity';
import { PagesRepository } from './pages.respository';

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(PagesRepository)
    private pageRepository: PagesRepository,
    @InjectRepository(PageLanguage)
    private pageLngRepository: Repository<PageLanguage>,
    private languageService: LanguageService,
    private paginationService: PaginationService,
  ) {}

  async create(createPageDto: CreatePageDto) {
    const { ruContent, ukContent, name } = createPageDto;
    await this.throwIfNameExists(name);
    const ruPage = this.pageLngRepository.create({
      content: ruContent,
      language: this.languageService.ru,
    });
    const ukPage = this.pageLngRepository.create({
      content: ukContent,
      language: this.languageService.uk,
    });
    const page = this.pageRepository.create({
      name,
      languages: [ukPage, ruPage],
    });

    return this.pageRepository.save(page);
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, skip } = paginationDto;
    return this.paginationService.paginateOutput(
      await this.pageRepository.findAndCount({ take: limit, skip }),
      paginationDto,
    );
  }

  async findOneByName(name: string, getPageDto: GetPageDto) {
    return this.pageRepository.getOneByName(name, getPageDto);
  }

  async update(id: number, updatePageDto: UpdatePageDto) {
    const { ruContent, ukContent, name } = updatePageDto;
    const page = await this.pageRepository.findOneOrFail(id);

    name !== page.name && this.throwIfNameExists(name);

    page.languages.forEach((lng) => {
      if (lng.language.name === ELanguage.ru) {
        lng.content = ruContent;
      }
      if (lng.language.name === ELanguage.uk) {
        lng.content = ukContent;
      }
    });
    page.name = name;
    return this.pageRepository.save(page);
  }

  remove(id: number) {
    return this.pageRepository.delete({ id });
  }

  private async throwIfNameExists(name: string) {
    if (await this.pageRepository.findOne({ where: { name } })) {
      throw new BadRequestException(`name "${name}" already exists`);
    }
  }
}
