import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { CustomLogger } from 'src/services/custom-logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService, { provide: 'LOGGER', useClass: CustomLogger }],
})
export class TodoModule {}
