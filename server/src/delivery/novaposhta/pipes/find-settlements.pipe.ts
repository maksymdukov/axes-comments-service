import { PipeTransform } from '@nestjs/common';
import { escapeRegExp } from 'lodash';

export class TransformFindSettlementsPipe implements PipeTransform {
  transform(value: any) {
    value.query = escapeRegExp(value.query);
    return value;
  }
}
