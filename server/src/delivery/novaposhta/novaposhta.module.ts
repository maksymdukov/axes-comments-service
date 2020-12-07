import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NovaposhtaApiModule } from 'src/integrations/novaposhta-api/novaposhta-api.module';
import { NovaposhtaController } from './novaposhta.controller';
import { NovaposhtaService } from './novaposhta.service';
import { Settlement, SettlementSchema } from './schemas/settlement.schema';
import {
  WarehouseType,
  WarehouseTypeSchema,
} from './schemas/warehouse-type.schema';
import { Warehouse, WarehouseSchema } from './schemas/warehouse.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Settlement.name, schema: SettlementSchema },
      { name: Warehouse.name, schema: WarehouseSchema },
      { name: WarehouseType.name, schema: WarehouseTypeSchema },
    ]),
    NovaposhtaApiModule.forFeature(),
  ],
  controllers: [NovaposhtaController],
  providers: [NovaposhtaService],
})
export class NovaposhtaModule {}
