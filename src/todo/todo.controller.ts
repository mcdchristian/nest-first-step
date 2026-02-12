// import { GetPaginatedTodoDto } from './dto/get-paginated-todo.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  /*NotFoundException,*/
  Param,
  ParseIntPipe,
  Post,
  Put,
  // Query,
  Req,
  Res,
  // UseInterceptors,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import type { Todo } from './entities/todo.entity';
import { AddTodoDto } from './dto/add-todo.dto';
import { TodoService } from './todo.service';
import { UpperAndFusionPipe } from '../pipes/upper-and-fusion/upper-and-fusion.pipe';
// import { DurationInterceptor } from '../interceptor/duration/duration.interceptor';

// @UseInterceptors(DurationInterceptor)
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {
    // this.todos = [];
  }
  // todos: Todo[];
  @Get('v2')
  getTodosV2(@Req() request: Request, @Res() response: Response) {
    // console.log(request);
    console.log('recuperer la liste de todos');
    response.status(200);
    response.json({
      contenu: "je suis une reponse generee par l'objet response d'express",
    });
    // console.log(response);
    // return 'la liste de TODOS';
  }

  @Get()
  getTodos(): Todo[] {
    return this.todoService.getTodos();
  }

  // @Get()
  // getTodos(@Query() mesQueriesParams: GetPaginatedTodoDto): Todo[] {
  //   console.log(mesQueriesParams /*instanceof GetPaginatedTodoDto*/);
  //   return this.todoService.getTodos();
  // }

  @Get('/:id/')
  // getTodoById(@Param() mesParams: { id: number }) {
  getTodoById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_FOUND }),
    )
    id: number,
  ) {
    return this.todoService.getTodoById(id);
  }

  @Post()
  addTodo(
    // @Body() newTodo,
    @Body() newTodo: AddTodoDto,
  ): Todo {
    // console.log(newTodo);
    return this.todoService.addTodo(newTodo);
  }

  @Delete(':id')
  deleteTodo(@Param('id', ParseIntPipe) id: number) {
    // console.log(typeof id);
    return this.todoService.deleteTodo(id);
  }
  @Put(':id')
  putTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() newTodo: /*Partial<Todo>*/ Partial<AddTodoDto>,
  ) {
    return this.todoService.updateTodo(id, newTodo);
  }
  @Post('pipe')
  testPipe(
    @Param('data', UpperAndFusionPipe) paramData,
    @Body(/*UpperAndFusionPipe*/) data,
  ): any {
    return data;
  }
}
