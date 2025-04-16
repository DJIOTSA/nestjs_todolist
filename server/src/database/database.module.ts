import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagRepository } from 'src/core/repository/tag.repository';
import { TaskRepository } from 'src/core/repository/task.repository';
import { TodoListRepository } from 'src/core/repository/todo-list.repository';
import { TokenRepository } from 'src/core/repository/token.repository';
import { UserRepository } from 'src/core/repository/user.repository';
import { TagOrmEntity } from './entities/tag.orm-entity';
import { TaskOrmEntity } from './entities/task.orm-entity';
import { TodoListOrmEntity } from './entities/todo-list.orm-entity';
import { TokenOrmEntity } from './entities/token.orm-entity';
import { UserOrmEntity } from './entities/user.orm-entity';
import { TypeOrmTagRepository } from './repositories/tag.typeorm-repository';
import { TypeOrmTaskRepository } from './repositories/task.typeorm-repository';
import { TypeOrmTodoListRepository } from './repositories/todo-list.typeorm-repository';
import { TypeOrmTokenRepository } from './repositories/token.typeorm-repository';
import { TypeOrmUserRepository } from './repositories/user.typeorm-repository';

const REPOSITORIES = [
  { provide: UserRepository, useClass: TypeOrmUserRepository },
  { provide: TagRepository, useClass: TypeOrmTagRepository },
  { provide: TaskRepository, useClass: TypeOrmTaskRepository },
  { provide: TodoListRepository, useClass: TypeOrmTodoListRepository },
  { provide: TokenRepository, useClass: TypeOrmTokenRepository },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserOrmEntity,
      TagOrmEntity,
      TokenOrmEntity,
      TodoListOrmEntity,
      TaskOrmEntity,
    ]),
  ],
  providers: [...REPOSITORIES],
  exports: [...REPOSITORIES.map((repo) => repo.provide)],
})
export class DatabaseModule {}
