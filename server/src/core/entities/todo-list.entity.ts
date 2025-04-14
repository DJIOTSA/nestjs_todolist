import { User } from './user.entity';
import { Task } from './task.entity';

export class TodoList {
  id: string; // UUID
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user?: User;
  tasks?: Task[];
}
