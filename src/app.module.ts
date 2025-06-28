import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { TodoController } from './todo/todo.controller';
// import { TodoService } from './todo/todo.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo/todo.entity';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [
    TodoModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'todo.db',
      entities: [Todo],
      synchronize: true,
    }),
  ],
  // controllers: [AppController, TodoController],
  // providers: [AppService, TodoService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
