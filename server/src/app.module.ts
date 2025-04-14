import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// Import your TypeORM entities here later when they are created
import { UserOrmEntity } from './infrastructure/database/entities/user.orm-entity';
import { TaskOrmEntity } from './infrastructure/database/entities/task.orm-entity';
import { TagOrmEntity } from './infrastructure/database/entities/tag.orm-entity';
import { TokenOrmEntity } from './infrastructure/database/entities/token.orm-entity';
import { TodoListOrmEntity } from './infrastructure/database/entities/todo-list.orm-entity';
import { ConfigModule, ConfigService } from '@nestjs/config'; // We'll use ConfigModule for env vars
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/../**/*.orm-entity{.ts,.js}'], // Auto-detect ORM entities
        synchronize: false, // NEVER use TRUE in production! Use migrations.
        autoLoadEntities: true, // Recommended alternative to specifying entities array
        logging: configService.get<string>('NODE_ENV') === 'development', // Log SQL in dev
        migrations: [
          __dirname + '/infrastructure/database/migrations/*{.ts,.js}',
        ],
        migrationsRun: true, // Automatically run migrations on startup
      }),
    }),
    // Add other modules here as you build them
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
