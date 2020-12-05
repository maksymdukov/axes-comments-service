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
import { ImagesService } from 'src/images/images.service';
import { DeleteImagesDto } from './dto/delete-images.dto';
import { UpdateImagesDto } from './dto/update-images.dto';
import { PaginatedQuery } from 'src/utils/pagination/paginated-query.decorator';
import { filesFilter } from './images.utils';
import { GetImagesAdminDto } from './dto/get-images-admin.dto';
import { UserRoles } from 'src/users/enums/roles.enum';
import { JwtAuth } from 'src/auth/decorators/jwt-auth.decorator';

@Controller('api/admin/images')
@JwtAuth(UserRoles.admin)
export class AdminImagesController {
  constructor(private imageService: ImagesService) {}

  @Get()
  getImages(@PaginatedQuery() getImagesDto: GetImagesAdminDto) {
    return this.imageService.getImages(getImagesDto);
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

    return this.imageService.uploadImages(files, true);
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
