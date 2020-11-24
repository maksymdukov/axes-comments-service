import { EntityRepository, Repository } from 'typeorm';
import { Delivery } from './delivery.entity';

@EntityRepository(Delivery)
export class DeliveryRepository extends Repository<Delivery> {}
