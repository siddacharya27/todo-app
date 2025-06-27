import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTodo {
  @ApiProperty({ example: 'buy groceries' })
  @IsNotEmpty({ message: 'title must not be empty' })
  'title': string;
}
