import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImagesService } from 'src/images/images.service';
import { DeepPartial, Repository } from 'typeorm';
import { CustomOrderDetails } from '../entities/custom-order-details.entity';
import { Order } from '../entities/orders.entity';

@Injectable()
export class CustomOrdersDetailsService {
  constructor(
    private imagesService: ImagesService,
    @InjectRepository(CustomOrderDetails)
    private customOrderDetailsRepository: Repository<CustomOrderDetails>,
  ) {}
  async createMany(order: Order, files: Express.Multer.File[]) {
    const images = await this.imagesService.uploadImages(files, false);
    const detailOpts: DeepPartial<CustomOrderDetails>[] = images.map(
      (image) => ({
        image,
        order,
      }),
    );
    const details = this.customOrderDetailsRepository.create(detailOpts);
    return this.customOrderDetailsRepository.save(details);
  }
}
