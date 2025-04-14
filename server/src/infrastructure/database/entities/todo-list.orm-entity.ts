import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserOrmEntity } from './user.orm-entity';
import { TaskOrmEntity } from './task.orm-entity';

@Entity('todo_lists')
export class TodoListOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => UserOrmEntity, (user) => user.todoLists, { eager: false })
  user?: UserOrmEntity;

  @OneToMany(() => TaskOrmEntity, (task) => task.todoList, { cascade: true })
  tasks?: TaskOrmEntity[];
}
