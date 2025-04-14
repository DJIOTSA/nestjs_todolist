import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoListOrmEntity } from '../entities/todo-list.orm-entity';
import { TodoListRepository } from 'src/core/repository/todo-list.repository';
import { TodoList } from 'src/core/entities/todo-list.entity';

@Injectable()
export class TypeOrmTodoListRepository implements TodoListRepository {
  constructor(
    @InjectRepository(TodoListOrmEntity)
    private readonly repo: Repository<TodoListOrmEntity>,
  ) {}

  async findById(id: string): Promise<TodoList | null> {
    return this.repo.findOne({ where: { id } });
  }

  async findByUserId(userId: string): Promise<TodoList[]> {
    return this.repo.find({ where: { userId } });
  }

  async create(todoList: TodoList): Promise<TodoList> {
    return this.repo.save(todoList);
  }

  async update(todoList: TodoList): Promise<TodoList> {
    return this.repo.save(todoList);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
