import { BadRequestException, Injectable } from '@nestjs/common';
import { NovaposhtaApiService } from 'src/integrations/novaposhta-api/novaposhta-api.service';
import { DatesService } from 'src/utils/dates/dates.service';
import { FindSettlementsDto } from './dto/find-settlements.dto';
import { GetWarehousesDto } from './dto/get-warehouses.dto';
import { SettlementRepository } from './repositories/settlement.repository';

@Injectable()
export class NovaposhtaService {
  private readonly settlementsIntervalDays = 15;
  private updatingSettlements = false;

  constructor(
    private novaposhtaApiService: NovaposhtaApiService,
    private settlementRepository: SettlementRepository,
    private datesService: DatesService,
  ) {}

  async findSettlements(findSettlementsDto: FindSettlementsDto) {
    // await this.checkExpiredSettlements();
    return this.settlementRepository.findMany(findSettlementsDto);
  }

  private async checkExpiredSettlements() {
    const settlement = await this.settlementRepository.findOne();
    if (
      !settlement ||
      this.datesService.diffInDays(settlement.updatedAt, new Date()) >
        this.settlementsIntervalDays
    ) {
      this.updateSettlements();
    }
  }

  async updateSettlements() {
    if (this.updatingSettlements) return;
    this.updatingSettlements = true;
    try {
      const warehouses = await this.novaposhtaApiService.fetchAllWarehouses();
      const allSettlements = [];
      for await (const settlements of this.novaposhtaApiService.fetchSettlements()) {
        allSettlements.push(...settlements);
      }

      await this.settlementRepository.updateAll(allSettlements, warehouses);
    } catch (error) {
      throw error;
    } finally {
      this.updatingSettlements = false;
    }
  }

  async findWarehouse(
    settlementRef: string,
    getWarehousesDto: GetWarehousesDto,
  ) {
    const settlement = await this.settlementRepository.findByRef(settlementRef);
    if (!settlement) {
      throw new BadRequestException('No such settlement');
    }

    if (!settlement.warehouses.length) {
      return [];
    }

    return this.settlementRepository.getWarehouses(settlement);
  }
}
