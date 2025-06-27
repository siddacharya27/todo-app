import { Injectable } from '@nestjs/common';
// import { Todo } from './todo.model';
import { Todo } from './todo.entity';
import { CreateTodo } from './dto/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  private todos: Todo[] = [];
  private idCounter = 1;

  //  For In memory implementation
  //   getAll(): Todo[] {
  //     console.log('All todos requested');
  //     return this.todos;
  //   }

  async getAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  //  For In memory implementation
  //   addToDo(createTodo: CreateTodo): Todo {
  //     console.log(`Add todo with title : ${createTodo.title}`);
  //     const newTodo = {
  //       id: this.idCounter++,
  //       title: createTodo.title,
  //       completed: false,
  //     };
  //     this.todos.push(newTodo);
  //     return newTodo;
  //   }

  async addToDo(createTodo: CreateTodo): Promise<Todo> {
    const newTodo = this.todoRepository.create({ title: createTodo.title });
    return this.todoRepository.save(newTodo);
  }

  //  For In memory implementation
  //   deleteToDo(id: number): boolean {
  //     const index = this.todos.findIndex((todo) => todo.id == id);
  //     if (index == -1) return false;
  //     this.todos.splice(index, 1);
  //     return true;
  //   }

  async deleteToDo(id: number): Promise<boolean> {
    const result = await this.todoRepository.delete(id);
    if (result.affected) {
      return result.affected > 0;
    }
    return false;
  }
}
