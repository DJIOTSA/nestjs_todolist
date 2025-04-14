import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// Import your TypeORM entities here later when they are created
import { ConfigModule, ConfigService } from '@nestjs/config'; // We'll use ConfigModule for env vars
// import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
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
        synchronize: true,
        autoLoadEntities: true,
        logging: configService.get<string>('NODE_ENV') === 'development',
        migrations: [
          __dirname + '/infrastructure/database/migrations/*{.ts,.js}',
        ],
        migrationsRun: true,
      }),
    }),
    // I18nModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     fallbackLanguage: 'en',
    //     loaderOptions: {
    //       path: path.join(__dirname, '/infrastructure/i18n/'),
    //       watch: configService.get('NODE_ENV') === 'development',
    //     },
    //     resolvers: [
    //       { use: QueryResolver, options: ['lang', 'locale', 'l'] }, // ?lang=en
    //       AcceptLanguageResolver,
    //       // new HeaderResolver(['x-custom-lang-header']), // Example custom header
    //     ],
    //   }),
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
