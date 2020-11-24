import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageRepository } from 'src/images/image.repository';
import { PaginationDto } from 'src/utils/pagination/pagination.dto';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { CreateSlideDto } from './dto/create-slide.dto';
import { SlidesRepository } from './slides.repository';

@Injectable()
export class SlidesService {
  constructor(
    @InjectRepository(SlidesRepository)
    private slidesRepository: SlidesRepository,
    @InjectRepository(ImageRepository)
    private imagesRepository: ImageRepository,
    private paginationService: PaginationService,
  ) {}

  async createSlide(createSlideDto: CreateSlideDto) {
    const [bigImage, smallImage] = await Promise.all([
      this.imagesRepository.findOneOrFail(createSlideDto.bigImageId),
      this.imagesRepository.findOneOrFail(createSlideDto.smallImageId),
    ]);
    const slide = this.slidesRepository.create({
      bigImage,
      smallImage,
      name: createSlideDto.name,
    });
    return this.slidesRepository.save(slide);
  }

  async deleteSlide(id: number) {
    const slide = await this.slidesRepository.findOneOrFail(id);
    return this.slidesRepository.remove(slide);
  }

  async updateSlide(id: number, updateSlideDto: CreateSlideDto) {
    const [slide, bigImage, smallImage] = await Promise.all([
      this.slidesRepository.findOneOrFail(id),
      this.imagesRepository.findOneOrFail(updateSlideDto.bigImageId),
      this.imagesRepository.findOneOrFail(updateSlideDto.smallImageId),
    ]);
    slide.bigImage = bigImage;
    slide.smallImage = smallImage;
    slide.name = updateSlideDto.name;
    return this.slidesRepository.save(slide);
  }

  async getSlides(paginationDto: PaginationDto) {
    return this.paginationService.paginateOutput(
      await this.slidesRepository.findSlides(paginationDto),
      paginationDto,
    );
  }
}
