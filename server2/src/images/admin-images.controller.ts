import {
  BadRequestException,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginatedQuery } from 'src/common/decorators/paginated-query.decorator';
import { ImagesService } from 'src/images/images.service';

@Controller('api/admin/images')
export class AdminImagesController {
  constructor(private imageService: ImagesService) {}

  @Get()
  getImages(@PaginatedQuery() pagintionDto: PaginationDto) {
    return this.imageService.getImages(pagintionDto);
  }

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('images', null, {
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.includes('image')) {
          return cb(new Error('Only images are allowed'), false);
        }
        cb(null, true);
      },
    }),
  )
  uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    // TODO
    // /tmp storage destination
    if (!files || !files.length) {
      throw new BadRequestException('files cannot be empty');
    }

    return this.imageService.uploadImages(files);
  }
}
