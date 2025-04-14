import { User } from './user.entity';
import { TodoList } from './todo-list.entity';
import { Tag } from './tag.entity';

export enum TaskStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  BLOCKED = 'blocked',
}

export class Task {
  id: string; // UUID
  title: string;
  description?: string;
  dueDate?: Date;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  imagePath?: string;
  todoListId: string;
  userId: string;
  todoList?: TodoList;
  user?: User;
  tags?: Tag[];
}
