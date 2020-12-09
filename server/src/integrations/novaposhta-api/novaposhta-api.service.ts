import { HttpService, Injectable, Logger } from '@nestjs/common';
import { NpResponse } from './interfaces/np-response.interface';
import { NpSettlementsResponse } from './interfaces/np-settlements-response.interface';
import { NpWarehousesResponse } from './interfaces/np-warehouses-response.interface';
import { AxiosResponse } from 'axios';
import { NpWarehouseTypesResponse } from './interfaces/np-warehouse-types-response.interface';

@Injectable()
export class NovaposhtaApiService {
  private logger = new Logger(NovaposhtaApiService.name);
  private settlementsPerPage = 150;

  constructor(private httpService: HttpService) {}

  private checkSuccessResponse<T extends NpResponse>() {
    return (resp: AxiosResponse<T>) => {
      if (resp.status !== 200 || !resp.data || !resp.data.success) {
        this.logger.error(
          `Error fetching settlements. Response status: ${resp.status}`,
        );
        throw new Error('Error fetching settlements');
      }
      return resp.data;
    };
  }

  private async fetchSettlementsByPage(pageNumber = 1) {
    return this.httpService
      .post<NpSettlementsResponse>('', {
        modelName: 'AddressGeneral',
        calledMethod: 'getSettlements',
        methodProperties: {
          Warehouse: '1',
          Page: String(pageNumber),
        },
      })
      .toPromise()
      .then(this.checkSuccessResponse<NpSettlementsResponse>());
  }

  async *fetchSettlements() {
    this.logger.verbose(`Processing page number: 1`);
    const firstPage = await this.fetchSettlementsByPage();
    const {
      info: { totalCount },
      data,
    } = firstPage;

    if (!totalCount) {
      this.logger.error('totalCount is falsy');
      throw new Error('Something went wrong');
    }

    if (!data.length) {
      this.logger.error('Received empty data array');
      throw new Error('Something went wrong');
    }

    yield data;

    const numberOfPages = Math.ceil(
      Number(totalCount) / this.settlementsPerPage,
    );
    // make n-th requests to api sequentially in order not to abuse api

    for (let page = 2; page <= numberOfPages; page++) {
      this.logger.verbose(`Processing page number: ${page} / ${numberOfPages}`);

      const { data } = await this.fetchSettlementsByPage(page);
      yield data;
    }
  }

  async fetchWarehouses(settlementRef: string) {
    return this.httpService
      .post<NpWarehousesResponse>('', {
        modelName: 'AddressGeneral',
        calledMethod: 'getWarehouses',
        methodProperties: {
          SettlementRef: settlementRef,
        },
      })
      .toPromise()
      .then(this.checkSuccessResponse<NpWarehousesResponse>())
      .then((resp) => resp.data);
  }

  async fetchWarehouseTypes() {
    return this.httpService
      .post<NpWarehouseTypesResponse>('', {
        modelName: 'AddressGeneral',
        calledMethod: 'getWarehouseTypes',
      })
      .toPromise()
      .then(this.checkSuccessResponse<NpWarehouseTypesResponse>())
      .then((resp) => resp.data);
  }

  async fetchAllWarehouses() {
    this.logger.verbose(`Fetching all warehouses`);
    return this.httpService
      .post<NpWarehousesResponse>('', {
        modelName: 'AddressGeneral',
        calledMethod: 'getWarehouses',
      })
      .toPromise()
      .then(this.checkSuccessResponse<NpWarehousesResponse>())
      .then((resp) => {
        this.logger.verbose(`Fetched ${resp.data.length} items`);
        return resp.data;
      });
  }
}
