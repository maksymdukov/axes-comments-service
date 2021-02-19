import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { NpSettlementsResponseItem } from 'src/integrations/novaposhta-api/interfaces/np-settlements-response.interface';
import { NpWarehousesResponseItem } from 'src/integrations/novaposhta-api/interfaces/np-warehouses-response.interface';
import { ELanguage } from 'src/language/languages.enum';
import { FindSettlementsDto } from '../dto/find-settlements.dto';
import { ELIGIBLE_WAREHOUSE_TYPES } from '../novaposhta.constants';
import { Settlement, SettlementDocument } from '../schemas/settlement.schema';

@Injectable()
export class SettlementRepository {
  constructor(
    @InjectModel(Settlement.name)
    private settlementModel: Model<SettlementDocument>,
    @InjectConnection()
    private connection: Connection,
  ) {}

  findByRef(ref: string) {
    return this.settlementModel.findOne({ Ref: ref });
  }

  findOne() {
    return this.settlementModel.findOne();
  }

  findMany(findSettlementsDto: FindSettlementsDto) {
    const { locale, query } = findSettlementsDto;

    const field = locale === ELanguage.ru ? 'DescriptionRu' : 'Description';
    const projectionFields =
      locale === ELanguage.ru
        ? {
            Description: 0,
            RegionsDescription: 0,
            SettlementTypeDescription: 0,
            AreaDescription: 0,
            warehouses: 0,
          }
        : {
            DescriptionRu: 0,
            RegionsDescriptionRu: 0,
            SettlementTypeDescriptionRu: 0,
            AreaDescriptionRu: 0,
            warehouses: 0,
          };
    return this.settlementModel
      .find(
        {
          [field]: { $regex: `^${query}`, $options: 'i' },
          'warehouses.TypeOfWarehouse': { $in: ELIGIBLE_WAREHOUSE_TYPES },
        },
        projectionFields,
      )
      .limit(50)
      .exec();
  }

  async getWarehouses(settlement: SettlementDocument) {
    return settlement.warehouses
      .filter((warehouse) =>
        ELIGIBLE_WAREHOUSE_TYPES.includes(warehouse.TypeOfWarehouse),
      )
      .sort((a, b) => {
        return a.Number - b.Number;
      });
  }

  async updateAll(
    settlements: NpSettlementsResponseItem[],
    warehouses: NpWarehousesResponseItem[],
  ) {
    await this.settlementModel.bulkWrite([
      {
        deleteMany: {
          filter: {},
        },
      },
      ...settlements.map((settlement) => ({
        insertOne: {
          document: settlement,
        },
      })),
    ]);

    await this.settlementModel.bulkWrite(
      warehouses.map((warehouse) => ({
        updateOne: {
          filter: {
            Ref: warehouse.SettlementRef,
          },
          update: {
            $push: { warehouses: warehouse },
          },
        },
      })),
    );
  }
}
