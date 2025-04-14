import { Task } from '../entities/task.entity';

export abstract class TaskRepository {
  abstract findById(id: string): Promise<Task | null>;
  abstract findByUserId(userId: string): Promise<Task[]>;
  abstract findByTodoListId(todoListId: string): Promise<Task[]>;
  abstract create(task: Task): Promise<Task>;
  abstract update(task: Task): Promise<Task>;
  abstract delete(id: string): Promise<void>;
}
