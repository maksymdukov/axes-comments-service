import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageHostingModule } from '../image-hosting/image-hosting.module';
import { AdminImagesController } from './admin-images.controller';
import { Image } from './image.entity';
import { ImagesService } from './images.service';

@Module({
  imports: [ImageHostingModule.forFeature(), TypeOrmModule.forFeature([Image])],
  controllers: [AdminImagesController],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}
