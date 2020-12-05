import { HttpService, Inject, Injectable } from '@nestjs/common';
import { ISSGOptions } from './interfaces/ssg-options.interface';
import { SSG_ROOT_OPTIONS } from './interfaces/ssg.constants';

@Injectable()
export class SsgService {
  constructor(
    private httpService: HttpService,
    @Inject(SSG_ROOT_OPTIONS) private options: ISSGOptions,
  ) {}

  rebuild() {
    return this.httpService.get(this.options.rebuildEndpoint);
  }
}
