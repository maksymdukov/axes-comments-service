import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageStorageModule } from 'src/integrations/image-storage/image-storage.module';
import { LanguageModule } from 'src/language/language.module';
import { AdminImagesController } from './admin-images.controller';
import { ImageLanguageRepository } from './image-language.repository';
import { ImageRepository } from './image.repository';
import { ImagesService } from './images.service';

@Module({
  imports: [
    ImageStorageModule.forFeature(),
    TypeOrmModule.forFeature([ImageRepository, ImageLanguageRepository]),
    LanguageModule,
  ],
  controllers: [AdminImagesController],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}
