import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidIdException extends HttpException {
  constructor(private field: number) {
    super({ message: 'Invalid Id format', field }, HttpStatus.BAD_REQUEST);
  }
}
