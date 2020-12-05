import { Body, Controller, Post } from '@nestjs/common';
import { SendPmDto } from './dto/send-pm.dto';
import { PmService } from './pm.service';

@Controller('/api/v1/pm')
export class PmController {
  constructor(private pmService: PmService) {}

  @Post()
  sendPM(@Body() sendPmDto: SendPmDto) {
    return this.pmService.sendPm(sendPmDto);
  }
}
