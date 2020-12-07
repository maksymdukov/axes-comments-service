import { NpResponse } from './np-response.interface';

export type NpWarehouseTypesResponse = NpResponse<NpWarehouseTypesResponseItem>;

export interface NpWarehouseTypesResponseItem {
  Ref: string;
  Description: string;
  DescriptionRu: string;
}
