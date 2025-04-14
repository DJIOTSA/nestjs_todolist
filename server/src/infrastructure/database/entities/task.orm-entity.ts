import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserOrmEntity } from './user.orm-entity';
import { TodoListOrmEntity } from './todo-list.orm-entity';
import { TagOrmEntity } from './tag.orm-entity';

export enum TaskStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  BLOCKED = 'blocked',
}

@Entity('tasks')
export class TaskOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ name: 'due_date', type: 'timestamp', nullable: true })
  dueDate?: Date;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.OPEN })
  status: TaskStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'completed_at', type: 'timestamp', nullable: true })
  completedAt?: Date;

  @Column({ name: 'image_path', nullable: true })
  imagePath?: string;

  @Column({ name: 'todo_list_id' })
  todoListId: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => TodoListOrmEntity, (todoList) => todoList.tasks, {
    eager: false,
  })
  todoList?: TodoListOrmEntity;

  @ManyToMany(() => TagOrmEntity, { cascade: true })
  @JoinTable({
    name: 'task_tags',
    joinColumn: { name: 'task_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags?: TagOrmEntity[];
}
