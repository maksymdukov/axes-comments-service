import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryRepository } from './delivery.repository';
import { NovaposhtaModule } from './novaposhta/novaposhta.module';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryRepository]), NovaposhtaModule],
  providers: [DeliveryService],
  controllers: [DeliveryController],
  exports: [DeliveryService],
})
export class DeliveryModule {}
