import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { NovaposhtaApiService } from 'src/integrations/novaposhta-api/novaposhta-api.service';
import { ELanguage } from 'src/language/languages.enum';
import { DatesService } from 'src/utils/dates/dates.service';
import { FindSettlementsDto } from './dto/find-settlements.dto';
import { GetWarehousesDto } from './dto/get-warehouses.dto';
import { ELIGIBLE_WAREHOUSE_TYPES } from './novaposhta.constants';
import { SettlementDocument, Settlement } from './schemas/settlement.schema';
import {
  WarehouseType,
  WarehouseTypeDocument,
} from './schemas/warehouse-type.schema';
import { Warehouse, WarehouseDocument } from './schemas/warehouse.schema';

@Injectable()
export class NovaposhtaService {
  private warehouseIntervalDays = 2;
  private settlementsIntervalDays = 30;

  constructor(
    private novaposhtaApiService: NovaposhtaApiService,
    @InjectModel(Settlement.name)
    private settlementModel: Model<SettlementDocument>,
    @InjectModel(Warehouse.name)
    private warehouseModel: Model<WarehouseDocument>,
    @InjectModel(WarehouseType.name)
    private warehouseTypeModel: Model<WarehouseTypeDocument>,
    @InjectConnection()
    private connection: Connection,
    private datesService: DatesService,
  ) {}

  async findSettlements(findSettlementsDto: FindSettlementsDto) {
    const { locale, query } = findSettlementsDto;
    await this.checkExpiredSettlements();
    const field = locale === ELanguage.ru ? 'DescriptionRu' : 'Description';
    const projectionFields =
      locale === ELanguage.ru
        ? {
            Description: 0,
            RegionsDescription: 0,
            SettlementTypeDescription: 0,
            AreaDescription: 0,
          }
        : {
            DescriptionRu: 0,
            RegionsDescriptionRu: 0,
            SettlementTypeDescriptionRu: 0,
            AreaDescriptionRu: 0,
          };
    return this.settlementModel
      .find(
        {
          [field]: { $regex: `^${query}`, $options: 'i' },
        },
        projectionFields,
      )
      .limit(50)
      .exec();
  }

  private async checkExpiredSettlements() {
    const settlement = await this.settlementModel.findOne({});
    if (
      !settlement ||
      this.datesService.diffInDays(settlement.createdAt, new Date()) >
        this.settlementsIntervalDays
    ) {
      this.updateSettlements();
    }
  }

  async updateSettlements() {
    // check interval, if it's too early - skip
    this.updateWarehouseTypes();
    const session = await this.connection.startSession();
    await session.withTransaction(async () => {
      await this.settlementModel.deleteMany({});
      for await (const settlements of this.novaposhtaApiService.fetchSettlements()) {
        await this.settlementModel.insertMany(settlements);
      }
    });
  }

  async findWarehouse(
    settlementRef: string,
    getWarehousesDto: GetWarehousesDto,
  ) {
    const { locale } = getWarehousesDto;

    const settlement = await this.settlementModel.findOne({
      Ref: settlementRef,
    });
    if (!settlement) {
      throw new BadRequestException('No such settlement');
    }

    const projectionFields =
      locale === ELanguage.ru
        ? {
            Description: 0,
            ShortAddress: 0,
            CityDescription: 0,
          }
        : {
            DescriptionRu: 0,
            ShortAddressRu: 0,
            CityDescriptionRu: 0,
          };
    // check if there are any previously saved warehouses in db
    const warehouse = await this.warehouseModel.findOne({
      SettlementRef: settlementRef,
    });

    if (!warehouse) {
      // no warehouses yet
      await this.updateWarehouses(settlementRef);
    }

    // check if warehouses in our db are expired
    await this.checkExpiredWarehouses(warehouse);

    // find using query
    return this.warehouseModel.find(
      {
        SettlementRef: settlementRef,
        TypeOfWarehouse: {
          $in: ELIGIBLE_WAREHOUSE_TYPES,
        },
      },
      projectionFields,
    );
  }

  private async checkExpiredWarehouses(warehouse: WarehouseDocument) {
    if (
      this.datesService.diffInDays(warehouse.createdAt, new Date()) >
      this.warehouseIntervalDays
    ) {
      return this.updateWarehouses(warehouse.SettlementRef);
    }
  }

  private async updateWarehouses(settlementRef: string) {
    const warehouses = await this.novaposhtaApiService.fetchWarehouses(
      settlementRef,
    );

    const session = await this.connection.startSession();
    await session.withTransaction(async () => {
      await this.warehouseModel.deleteMany({ SettlementRef: settlementRef });
      await this.warehouseModel.insertMany(warehouses);
    });
  }

  async updateWarehouseTypes() {
    const warehouseTypes = await this.novaposhtaApiService.fetchWarehouseTypes();
    const session = await this.connection.startSession();
    await session.withTransaction(async () => {
      await this.warehouseTypeModel.deleteMany({});
      await this.warehouseTypeModel.insertMany(warehouseTypes);
    });
  }
}
