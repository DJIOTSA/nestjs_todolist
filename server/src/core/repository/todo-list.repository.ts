import { TodoList } from '../entities/todo-list.entity';

export abstract class TodoListRepository {
  abstract findById(id: string): Promise<TodoList | null>;
  abstract findByUserId(userId: string): Promise<TodoList[]>;
  abstract create(todoList: TodoList): Promise<TodoList>;
  abstract update(todoList: TodoList): Promise<TodoList>;
  abstract delete(id: string): Promise<void>;
}
