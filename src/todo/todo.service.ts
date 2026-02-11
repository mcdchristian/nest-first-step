import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { AddTodoDto } from './dto/add-todo.dto';

@Injectable()
export class TodoService {
  todos: Todo[] = [];
  getTodos(/*params: any*/): Todo[] {
    // console.log(params);
    return this.todos;
  }
  AddTodo(newTodo: AddTodoDto): Todo {
    // const todo = new Todo();
    const { name, description } = newTodo;
    let id: number;
    if (this.todos.length) {
      id = this.todos[this.todos.length - 1].id + 1;
    } else {
      id = 1;
    }
    const todo = {
      id,
      name,
      description,
      createdAt: new Date(),
    };
    this.todos.push(todo);
    return todo;
  }
  getTodoById(id: number): Todo {
    const todo = this.todos.find((actuTodo) => actuTodo.id === id);
    if (todo) return todo;
    throw new NotFoundException(`le todo d'id ${id} n'existe pas`);
  }
  deleteTodo(id: number) {
    const index = this.todos.findIndex((todo) => todo.id === +id);
    if (index >= 0) {
      this.todos.splice(index, 1);
    } else {
      throw new NotFoundException(`le todo d'id ${id} n'existe pas`);
    }
    return {
      message: `le todo d'id ${id} a bien ete supprime`,
      count: 1,
    };
  }
  updateTodo(id: number, newTodo: Partial<Todo>): Todo {
    const todo = this.getTodoById(id);
    todo.description = newTodo.description
      ? newTodo.description
      : todo.description;
    todo.name = newTodo.name ? newTodo.name : todo.name;
    return todo;
  }
}
