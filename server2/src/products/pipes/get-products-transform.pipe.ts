import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class GetProductsTransform implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    value.featured ||= 'false';
    value.isFeatured = value.featured === 'true';

    return value;
  }
}
