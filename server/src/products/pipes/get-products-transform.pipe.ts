import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class GetProductsTransform implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    value.isFeatured = value.featured === 'true';
    value.isActive = value.active === 'true';

    return value;
  }
}
