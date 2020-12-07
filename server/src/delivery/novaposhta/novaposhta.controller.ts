import { Controller, Get, Param, Query } from '@nestjs/common';
import { FindSettlementsDto } from './dto/find-settlements.dto';
import { GetWarehousesDto } from './dto/get-warehouses.dto';
import { NovaposhtaService } from './novaposhta.service';
import { TransformFindSettlementsPipe } from './pipes/find-settlements.pipe';

@Controller('/api/v1/delivery/novaposhta')
export class NovaposhtaController {
  constructor(private novaposhtaService: NovaposhtaService) {}

  @Get('settlements')
  findSettlements(
    @Query(TransformFindSettlementsPipe) findSettlementsDto: FindSettlementsDto,
  ) {
    return this.novaposhtaService.findSettlements(findSettlementsDto);
  }

  @Get('/warehouses/:id')
  getWarehouses(
    @Param('id') id: string,
    @Query() getWarehousesDto: GetWarehousesDto,
  ) {
    return this.novaposhtaService.findWarehouse(id, getWarehousesDto);
  }
}
