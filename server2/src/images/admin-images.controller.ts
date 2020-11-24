import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PaginationDto } from 'src/utils/pagination/pagination.dto';
import { ImagesService } from 'src/images/images.service';
import { DeleteImagesDto } from './dto/delete-images.dto';
import { UpdateImagesDto } from './dto/update-images.dto';
import { PaginatedQuery } from 'src/utils/pagination/paginated-query.decorator';
import { filesFilter } from './images.utils';

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
      fileFilter: filesFilter,
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

  @Delete()
  deleteImages(@Body() deleteImagesDto: DeleteImagesDto) {
    return this.imageService.deleteImages(deleteImagesDto);
  }

  @Patch()
  updateImageTitles(@Body() updateImagesDto: UpdateImagesDto) {
    return this.imageService.updateImagesTitles(updateImagesDto);
  }
}
