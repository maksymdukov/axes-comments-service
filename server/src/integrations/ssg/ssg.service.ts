import { HttpService, Inject, Injectable } from '@nestjs/common';
import { ISSGOptions } from './interfaces/ssg-options.interface';
import { SSG_ROOT_OPTIONS } from './interfaces/ssg.constants';

@Injectable()
export class SsgService {
  zeitApiBaseUrl = 'https://api.vercel.com';
  constructor(
    private httpService: HttpService,
    @Inject(SSG_ROOT_OPTIONS) private options: ISSGOptions,
  ) {}

  rebuild() {
    return this.httpService.get(this.options.rebuildEndpoint).toPromise();
  }

  getBuilds() {
    return this._getBuilds(this.options.projectId);
  }

  private _getBuilds(projectId: string, limit = 5) {
    return this.httpService
      .get('/v5/now/deployments', {
        params: {
          projectId: projectId,
          limit,
        },
      })
      .toPromise()
      .then((response) => response.data.deployments);
  }

  async cancelBuild(buildId: string) {
    const response = await this.httpService
      .patch(`/v12/now/deployments/${buildId}/cancel`)
      .toPromise();

    return response.data;
  }
}
