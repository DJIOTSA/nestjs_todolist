/* eslint-disable prettier/prettier */
import { Task } from 'src/tasks/entities/task.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('tags')
export class Tag {
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

  @Column({ name: 'user_id', nullable: true })
  userId?: string;

  @Column({ name: 'is_public', default: false })
  isPublic: boolean;

  @ManyToMany(() => Task, (task) => task.tags)
  tasks?: Task[];
}
