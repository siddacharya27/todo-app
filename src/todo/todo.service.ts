import {
  Inject,
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
// import { Todo } from './todo.model';
import { Todo } from './todo.entity';
import { CreateTodo } from './dto/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from 'src/interfaces/logger.interface';

@Injectable()
export class TodoService
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    OnApplicationShutdown
{
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    @Inject('LOGGER')
    private readonly logger: Logger,
    @Inject('APP_NAME')
    private readonly appName: string,
    @Inject('SimpleLogger')
    private slogger: { log: (msg: string) => void },
    @Inject('RANDOM_TOKEN')
    private readonly token: string,
  ) {
    console.log('Service Constructor');
  }
  onApplicationShutdown(signal?: string) {
    console.log('Todo app shutdown!');
  }
  onModuleDestroy() {
    console.log('Todo service destroyed');
  }
  onApplicationBootstrap() {
    console.log('Todo app bootstrapped!');
  }

  private todos: Todo[] = [];
  private idCounter = 1;

  onModuleInit() {
    console.log(
      `Todo service initiated for ${this.token} ${this.getAppName()}`,
    );
  }

  getAppName(): string {
    this.slogger.log('Getting App Name from Constants!');
    return this.appName;
  }

  //  For In memory implementation
  //   getAll(): Todo[] {
  //     console.log('All todos requested');
  //     return this.todos;
  //   }

  async getAll(): Promise<Todo[]> {
    this.logger.log('Custom logger used for logging get all to-dos');
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
