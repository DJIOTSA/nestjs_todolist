/* eslint-disable prettier/prettier */
 
import { Tag as TagInterface } from 'src/core/entities/tag.entity';
import { Task as TaskInterface } from 'src/core/entities/task.entity';
import { TodoList as TodoListInterface } from 'src/core/entities/todo-list.entity';
import { Token as TokenInterface } from 'src/core/entities/token.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { TodoList } from 'src/todo-lists/entities/todo-list.entity';
import { Token } from 'src/tokens/entities/token.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import {
    User as UserInterface,
    UserRole,
} from '../../core/entities/user.entity';

@Entity('users')
export class User implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 50, unique: true })
  username: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, select: false }) // Don't select password by default
  password?: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: true,
    select: false,
  })
  apiKey?: string; // Hashed API Key

  @Column({ type: 'varchar', length: 50, nullable: true })
  firstName?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lastName?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({ type: 'boolean', default: false })
  isEmailConfirmed: boolean;

  // Relationships
  @OneToMany(() => TodoList, (todoList: TodoListInterface) => todoList.user)
  todoLists?: TodoList[];

  @OneToMany(() => Task, (task: TaskInterface) => task.user)
  assignedTasks?: Task[];

  @OneToMany(() => Tag, (tag: TagInterface) => tag.user)
  createdTags?: Tag[];

  @OneToMany(() => Token, (token: TokenInterface) => token.user)
  tokens?: Token[];
}
