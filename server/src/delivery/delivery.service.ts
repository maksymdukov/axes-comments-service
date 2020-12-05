import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryRepository } from './delivery.repository';
import { CreateDeliveryDto } from './dto/create-delivery.dto';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(DeliveryRepository)
    private deliveryRepository: DeliveryRepository,
  ) {}

  async create(createDeliveryDto: CreateDeliveryDto) {
    const {
      delivery,
      npNumber,
      npSettlement,
      ukrAddress,
      ukrIdx,
    } = createDeliveryDto;
    // TODO user relation
    const mainDelivery = this.deliveryRepository.create({
      type: delivery,
      address: ukrAddress,
      idx: ukrIdx,
      branch: npNumber,
      settlement: npSettlement,
    });
    return this.deliveryRepository.save(mainDelivery);
  }

  async change(id: number, changeDeliveryDto: CreateDeliveryDto) {
    const {
      npNumber,
      npSettlement,
      delivery,
      ukrAddress,
      ukrIdx,
    } = changeDeliveryDto;
    const existingDelivery = await this.deliveryRepository.findOneOrFail(id);
    existingDelivery.address = ukrAddress ?? existingDelivery.address;
    existingDelivery.branch = npNumber ?? existingDelivery.branch;
    existingDelivery.idx = ukrIdx ?? existingDelivery.idx;
    existingDelivery.settlement = npSettlement ?? existingDelivery.settlement;
    existingDelivery.type = delivery ?? existingDelivery.type;
    return this.deliveryRepository.save(existingDelivery);
  }
}
