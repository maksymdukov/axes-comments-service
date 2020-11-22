import { Inject, Injectable } from '@nestjs/common';
import { IMAGE_HOSTING_OPTIONS } from './image-hosting.constants';
import { ImageHostingOptions } from './interfaces/image-hosting-options.interface';
import { createClient } from 'contentful-management';
import { PaginationDto } from 'src/utils/pagination/pagination.dto';
import { ClientAPI } from 'contentful-management/dist/typings/create-contentful-api';
import { Asset } from 'contentful-management/dist/typings/entities/asset';
import { INormalizedAsset } from './interfaces/normalized-asset.interface';

@Injectable()
export class ImageHostingService {
  private _client: ClientAPI;
  private options: ImageHostingOptions;
  constructor(
    @Inject(IMAGE_HOSTING_OPTIONS)
    options: ImageHostingOptions,
  ) {
    this.options = options;
    this._client = createClient({
      accessToken: options.accessToken,
    });
  }

  private async getClient() {
    const space = await this._client.getSpace(this.options.spaceId);
    return space.getEnvironment(this.options.environmentId);
  }

  async getImages(paginationDto: PaginationDto) {
    const client = await this.getClient();
    const results = await client.getAssets({
      query: { limit: paginationDto.limit, skip: paginationDto.skip },
    });
    return results;
  }

  async uploadImage(file: Express.Multer.File) {
    const client = await this.getClient();
    let asset = await client.createAssetFromFiles({
      fields: {
        title: {
          uk: file.filename,
          ru: file.filename,
        },
        description: {
          uk: file.filename,
          ru: file.filename,
        },
        file: {
          uk: {
            contentType: file.mimetype,
            fileName: file.originalname,
            file: file.buffer.buffer,
          },
          ru: {
            contentType: file.mimetype,
            fileName: file.originalname,
            file: file.buffer.buffer,
          },
        },
      },
    });

    asset = await asset.processForAllLocales();
    return this.normalizieAsset(asset);
  }

  async deleteImage(id: string) {
    const client = await this.getClient();
    const asset = await client.getAsset(id);
    await asset.delete();
  }

  private normalizieAsset(asset: Asset): INormalizedAsset {
    const {
      sys: { id },
      fields: {
        file: {
          uk: {
            fileName,
            url,
            contentType,
            details: {
              image: { width, height },
            },
          },
        },
      },
    } = asset;
    return {
      id,
      url,
      width: width as number,
      height: height as number,
      fileName,
      contentType,
    };
  }
}
