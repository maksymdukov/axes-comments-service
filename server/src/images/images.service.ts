import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/utils/pagination/pagination.dto';
import { ImageStorageService } from '../integrations/image-storage/image-storage.service';
import { DeleteImagesDto } from './dto/delete-images.dto';
import { UpdateImagesDto } from './dto/update-images.dto';
import { ImageRepository } from './image.repository';
import { LanguageService } from 'src/language/language.service';
import { ImageLanguageRepository } from './image-language.repository';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { GetImagesAdminDto } from './dto/get-images-admin.dto';

@Injectable()
export class ImagesService {
  constructor(
    private imageStorage: ImageStorageService,
    @InjectRepository(ImageRepository) private imageRepository: ImageRepository,
    @InjectRepository(ImageLanguageRepository)
    private imageLanguageRepository: ImageLanguageRepository,
    private languageService: LanguageService,
    private paginationService: PaginationService,
  ) {}

  async getImages(getImagesAdminDto: GetImagesAdminDto) {
    return this.paginationService.paginateOutput(
      await this.imageRepository.findImages(getImagesAdminDto),
      getImagesAdminDto,
    );
  }

  async uploadImages(files: Express.Multer.File[], isAdmin = false) {
    const assets = await this.uploadImagesToStorage(files);

    const persistPromises = assets.map(async (asset) => {
      const { contentType, fileName, height, id, url, width, size } = asset;

      const image = this.imageRepository.create({
        contentType,
        fileName,
        height,
        width,
        imageId: id,
        url,
        size,
        isAdmin,
      });
      const img = await this.imageRepository.save(image);

      const imageLanguageUk = this.imageLanguageRepository.create({
        image,
        title: image.fileName,
        language: this.languageService.uk,
      });
      const imageLanguageRu = this.imageLanguageRepository.create({
        image,
        title: image.fileName,
        language: this.languageService.ru,
      });

      await Promise.all([
        this.imageLanguageRepository.save(imageLanguageUk),
        this.imageLanguageRepository.save(imageLanguageRu),
      ]);
      return img;
    });

    const images = await Promise.all(persistPromises);

    return images;
  }

  async uploadImagesToStorage(files: Express.Multer.File[]) {
    const uploadPromises = files.map((file) =>
      this.imageStorage.uploadImage(file),
    );
    return await Promise.all(uploadPromises);
  }

  async updateImagesTitles(updateImagesDto: UpdateImagesDto) {
    const updateImagesPromises = updateImagesDto.images.map(async (img) => {
      const image = await this.imageLanguageRepository.findImageLanguage(img);
      image.title = img.title;
      return this.imageLanguageRepository.save(image);
    });
    return Promise.all(updateImagesPromises);
  }

  async deleteImages(deleteImagesDto: DeleteImagesDto) {
    const images = await this.imageRepository.findByIds(deleteImagesDto.ids);

    try {
      const deleteFromHostingPromises = images.map((img) =>
        this.imageStorage.deleteImage(img.imageId),
      );
      await Promise.all(deleteFromHostingPromises);
    } catch (error) {
      console.log(error);
    }

    return this.imageRepository.remove(images);
  }
}
