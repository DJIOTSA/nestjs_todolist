import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskOrmEntity } from '../entities/task.orm-entity';
import { TaskRepository } from 'src/core/repository/task.repository';
import { Task } from 'src/core/entities/task.entity';

@Injectable()
export class TypeOrmTaskRepository implements TaskRepository {
  constructor(
    @InjectRepository(TaskOrmEntity)
    private readonly repo: Repository<TaskOrmEntity>,
  ) {}

  async findById(id: string): Promise<Task | null> {
    return this.repo.findOne({ where: { id } });
  }

  async findByUserId(userId: string): Promise<Task[]> {
    return this.repo.find({ where: { userId } });
  }

  async findByTodoListId(todoListId: string): Promise<Task[]> {
    return this.repo.find({ where: { todoListId } });
  }

  async create(task: Task): Promise<Task> {
    return this.repo.save(task);
  }

  async update(task: Task): Promise<Task> {
    return this.repo.save(task);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
