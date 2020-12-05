import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ApiConfigService } from 'src/api-config/api-config.service';
import path from 'path';

@Injectable()
export class ServeFrontendMiddleware implements NestMiddleware {
  constructor(private apiConfigService: ApiConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { url } = req;
    if (url.indexOf('/api') === 1) {
      next();
    } else {
      res.sendFile(
        path.join(
          this.apiConfigService.config.server.feBuildPath,
          'index.html',
        ),
      );
    }
  }
}
