import { Module } from '@nestjs/common';
import { SlidesService } from './slides.service';
import { SlidesAdminController } from './slides-admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageRepository } from 'src/images/image.repository';
import { SlidesRepository } from './slides.repository';
import { SlidesController } from './slides.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SlidesRepository, ImageRepository])],
  providers: [SlidesService],
  controllers: [SlidesAdminController, SlidesController],
})
export class SlidesModule {}
