import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config({ path: '.env' });

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    __dirname +
      '/src/infrastructure/database/entities/**/*.orm-entity{.ts,.js}',
  ],
  migrations: [
    __dirname + '/src/infrastructure/database/migrations/*{.ts,.js}',
  ],
  synchronize: false, // Set to false in production
  logging: process.env.NODE_ENV === 'development',
};

export default new DataSource(dataSourceOptions);
