import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, Model } from 'mongoose';
import { NpSettlementsResponseItem } from 'src/integrations/novaposhta-api/interfaces/np-settlements-response.interface';
import { NpWarehousesResponseItem } from 'src/integrations/novaposhta-api/interfaces/np-warehouses-response.interface';
import { ELanguage } from 'src/language/languages.enum';
import { FindSettlementsDto } from '../dto/find-settlements.dto';
import { GetWarehousesDto } from '../dto/get-warehouses.dto';
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

  async getWarehouses(ref: string, getWarehousesDto: GetWarehousesDto) {
    const { locale } = getWarehousesDto;
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

    return this.settlementModel
      .aggregate()
      .match({ Ref: ref })
      .unwind('warehouses')
      .match({
        'warehouses.TypeOfWarehouse': { $in: ELIGIBLE_WAREHOUSE_TYPES },
      })
      .sort({ 'warehouses.Number': 1 })
      .replaceRoot('warehouses')
      .project(projectionFields);
  }

  async updateAll(
    settlementsGen: AsyncGenerator<NpSettlementsResponseItem[]>,
    warehouses: NpWarehousesResponseItem[],
  ) {
    const session = await this.connection.startSession();
    await session.withTransaction(async () => {
      for await (const settlements of settlementsGen) {
        await this.settlementModel.bulkWrite(
          settlements.map((settlement) => ({
            updateOne: {
              filter: {
                Ref: settlement.Ref,
              },
              update: settlement,
              upsert: true,
            },
          })),
          { session },
        );
      }

      await this.settlementModel.updateMany(
        {},
        { warehouses: [] },
        { session },
      );

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
        { session },
      );
    });
  }
}
