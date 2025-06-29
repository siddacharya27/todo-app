import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
// import { Todo } from './todo.model';
import { CreateTodo } from './dto/create-todo.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoggingInterceptor } from 'src/logger.interceptor';
import { UppercasePipe } from 'src/pipes/uppercase.pipe';
import { PositiveIntPipe } from 'src/pipes/positiveint.pipe';

@ApiTags('todo')
@UseInterceptors(LoggingInterceptor)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTodos() {
    return this.todoService.getAll();
  }

  @Get(':id')
  async getTodoById(@Param('id', PositiveIntPipe) id: number) {
    return this.todoService.getById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async addTodo(@Body() createTodo: CreateTodo) {
    return this.todoService.addToDo(createTodo);
  }

  @Delete(':id')
  async deleteTodo(
    @Param('id', ParseIntPipe) id: number,
    @Query('q', UppercasePipe) query?: string,
  ) {
    if (query) console.log(`Query String Parsed ${query}`);
    const result = await this.todoService.deleteToDo(id);
    return { success: result };
  }
}
