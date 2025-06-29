import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class PositiveIntPipe implements PipeTransform {
  transform(value: string) {
    const val = parseInt(value, 10);
    if (isNaN(val) || val < 1) {
      throw new BadRequestException('Id must be a positive integer');
    }
    return val;
  }
}
