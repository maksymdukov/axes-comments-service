import { Module } from '@nestjs/common';
import { SlidesService } from './slides.service';
import { SlidesAdminController } from './slides-admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slide } from './slide.entity';
import { ImageRepository } from 'src/images/image.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Slide, ImageRepository])],
  providers: [SlidesService],
  controllers: [SlidesAdminController],
})
export class SlidesModule {}
