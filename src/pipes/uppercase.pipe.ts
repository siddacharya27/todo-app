import { PipeTransform } from '@nestjs/common';

export class UppercasePipe implements PipeTransform {
  transform(value: string) {
    return value.toUpperCase();
  }
}
