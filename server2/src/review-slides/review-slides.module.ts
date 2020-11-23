import { Module } from '@nestjs/common';
import { ReviewSlidesService } from './review-slides.service';
import { ReviewSlidesController } from './review-slides.controller';
import { ReviewSlidesAdmin } from './review-slides-admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewSlidesRepository } from './review-slides.repository';
import { ImageRepository } from 'src/images/image.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReviewSlidesRepository, ImageRepository]),
  ],
  providers: [ReviewSlidesService],
  controllers: [ReviewSlidesController, ReviewSlidesAdmin],
})
export class ReviewSlidesModule {}
