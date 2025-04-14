import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { UserOrmEntity } from './user.orm-entity';
import { TaskOrmEntity } from './task.orm-entity';

@Entity('tags')
export class TagOrmEntity {
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

  @ManyToMany(() => TaskOrmEntity, (task) => task.tags)
  tasks?: TaskOrmEntity[];
}
