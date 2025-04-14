import { User } from './user.entity';
import { Task } from './task.entity';

export class Tag {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  userId?: string; // Foreign key ID (creator, null if public)
  isPublic: boolean;
  user?: User;
  tasks?: Task[];
}
