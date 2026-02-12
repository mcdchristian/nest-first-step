import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { FirstMiddleware } from './middlewares/first/first.middleware';
import { loggerMiddleware } from './middlewares/logger.middleware';
import { ConfigModule } from '@nestjs/config';

// import dotenv from 'dotenv';

// dotenv.config();

@Module({
  imports: [TodoModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(FirstMiddleware)
      .forRoutes(
        'hello',
        { path: 'todo', method: RequestMethod.GET },
        // { path: 'todo', method: RequestMethod.POST },
        { path: '*', method: RequestMethod.DELETE },
        // { path: 'todo/*', method: RequestMethod.PUT },
        // { path: 'todo/*', method: RequestMethod.GET },
      )
      .apply(loggerMiddleware)
      .forRoutes('');
  }
}
