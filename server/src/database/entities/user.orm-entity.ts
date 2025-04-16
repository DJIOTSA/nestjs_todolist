import { Tag } from 'src/core/entities/tag.entity';
import { Task } from 'src/core/entities/task.entity';
import { TodoList } from 'src/core/entities/todo-list.entity';
import { Token } from 'src/core/entities/token.entity';
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
import { TagOrmEntity } from './tag.orm-entity';
import { TaskOrmEntity } from './task.orm-entity';
import { TodoListOrmEntity } from './todo-list.orm-entity';
import { TokenOrmEntity } from './token.orm-entity';

@Entity('users')
export class UserOrmEntity implements UserInterface {
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
  @OneToMany(() => TodoListOrmEntity, (todoList: TodoList) => todoList.user)
  todoLists?: TodoListOrmEntity[];

  @OneToMany(() => TaskOrmEntity, (task: Task) => task.user)
  assignedTasks?: TaskOrmEntity[];

  @OneToMany(() => TagOrmEntity, (tag: Tag) => tag.user)
  createdTags?: TagOrmEntity[];

  @OneToMany(() => TokenOrmEntity, (token: Token) => token.user)
  tokens?: TokenOrmEntity[];
}
