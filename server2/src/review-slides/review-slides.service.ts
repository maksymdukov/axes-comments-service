import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageRepository } from 'src/images/image.repository';
import { PaginationDto } from 'src/utils/pagination/pagination.dto';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { CreateReviewSlideDto } from './dto/create-review-slide.dto';
import { ReviewSlidesRepository } from './review-slides.repository';

@Injectable()
export class ReviewSlidesService {
  constructor(
    @InjectRepository(ReviewSlidesRepository)
    private reviewSlidesRepository: ReviewSlidesRepository,
    @InjectRepository(ImageRepository)
    private imageRepository: ImageRepository,
    private paginationService: PaginationService,
  ) {}

  async createSlide(createReviewSlideDto: CreateReviewSlideDto) {
    const { imageId, name } = createReviewSlideDto;
    const image = await this.imageRepository.findOneOrFail(imageId);
    const slide = this.reviewSlidesRepository.create({
      image,
      name,
    });
    return this.reviewSlidesRepository.save(slide);
  }

  async updateSlide(id: number, updateReviewSlideDto: CreateReviewSlideDto) {
    const { imageId, name } = updateReviewSlideDto;
    const [image, slide] = await Promise.all([
      this.imageRepository.findOneOrFail(imageId),
      this.reviewSlidesRepository.findOneOrFail(id),
    ]);
    slide.image = image;
    slide.name = name;
    return this.reviewSlidesRepository.save(slide);
  }

  async deleteSlide(id: number) {
    const slide = await this.reviewSlidesRepository.findOneOrFail(id);
    return this.reviewSlidesRepository.remove(slide);
  }

  async getSlides(paginationDto: PaginationDto) {
    const [slides, total] = await this.reviewSlidesRepository.findSlides(
      paginationDto,
    );
    return this.paginationService.paginateOutput(slides, total, paginationDto);
  }

  async getSlideById(id: number) {
    return this.reviewSlidesRepository.findSlideById(id);
  }
}
