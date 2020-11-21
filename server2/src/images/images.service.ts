import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { paginatedOutput } from 'src/common/utils/paginated-output.utils';
import { Repository } from 'typeorm';
import { ImageHostingService } from '../image-hosting/image-hosting.service';
import { Image } from './image.entity';

@Injectable()
export class ImagesService {
  constructor(
    private imageHosting: ImageHostingService,
    @InjectRepository(Image) private imageRepository: Repository<Image>,
  ) {}

  async getImages(paginationDto: PaginationDto) {
    const { skip, limit } = paginationDto;
    const [images, total] = await this.imageRepository.findAndCount({
      skip,
      take: limit,
    });
    return paginatedOutput(images, total, paginationDto);
  }

  async uploadImages(files: Express.Multer.File[]) {
    const uploadPromises = files.map((file) =>
      this.imageHosting.uploadImage(file),
    );
    const assets = await Promise.all(uploadPromises);

    const persistPromises = assets.map((asset) => {
      const { contentType, fileName, height, id, url, width } = asset;

      const image = this.imageRepository.create({
        contentType,
        fileName,
        height,
        width,
        imageId: id,
        url,
        titleUk: fileName,
        titleRu: fileName,
      });
      return this.imageRepository.save(image);
    });

    const images = await Promise.all(persistPromises);

    return images;
  }

  updateImages() {}

  async deleteImages(ids: number[]) {
    const images = await this.imageRepository.findByIds(ids);
    if (!images.length) {
      throw new BadRequestException('No such images');
    }

    const deleteFromHostingPromises = images.map((img) =>
      this.imageHosting.deleteImage(img.imageId),
    );
    await Promise.all(deleteFromHostingPromises);

    return this.imageRepository.remove(images);
  }
}
