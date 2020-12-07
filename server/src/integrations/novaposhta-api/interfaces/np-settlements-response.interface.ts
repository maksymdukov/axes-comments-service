import { NpResponse } from './np-response.interface';

export type NpSettlementsResponse = NpResponse<NpSettlementsResponseItem>;

export interface NpSettlementsResponseItem {
  Ref: string;
  SettlementType: string;
  Latitude: string;
  Longitude: string;
  Description: string;
  DescriptionRu: string;
  SettlementTypeDescription: string;
  SettlementTypeDescriptionRu: string;
  Region: string;
  RegionsDescription: string;
  RegionsDescriptionRu: string;
  Area: string;
  AreaDescription: string;
  AreaDescriptionRu: string;
  Index1: string;
  Index2: string;
  IndexCOATSU1: string;
  Delivery1: string;
  Delivery2: string;
  Delivery3: string;
  Delivery4: string;
  Delivery5: string;
  Delivery6: string;
  Delivery7: string;
  SpecialCashCheck: number;
  Warehouse: string;
}
