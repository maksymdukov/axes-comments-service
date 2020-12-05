import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { filesFilter } from 'src/images/images.utils';
import { CreateAnonymousCustomOrder } from '../dto/create-anon-custom-order.dto';
import { CreateAnonymousOrderDto } from '../dto/create-anonymous-order.dto';
import { OrdersService } from '../services/orders.service';

@Controller('/api/v1/orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  createAnonymousOrder(@Body() createOrderDto: CreateAnonymousOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Post('/custom')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      fileFilter: filesFilter,
    }),
  )
  createAnonymousCustomOrder(
    @UploadedFiles() files: Express.Multer.File[],
    @Body()
    createAnonCustomOrderDto: CreateAnonymousCustomOrder,
  ) {
    createAnonCustomOrderDto.files = files;
    return this.ordersService.create(createAnonCustomOrderDto);
  }
}
