import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageModule } from 'src/language/language.module';
import { ImageHostingModule } from '../image-hosting/image-hosting.module';
import { AdminImagesController } from './admin-images.controller';
import { ImageLanguageRepository } from './image-language.repository';
import { ImageRepository } from './image.repository';
import { ImagesService } from './images.service';

@Module({
  imports: [
    ImageHostingModule.forFeature(),
    TypeOrmModule.forFeature([ImageRepository, ImageLanguageRepository]),
    LanguageModule,
  ],
  controllers: [AdminImagesController],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}
