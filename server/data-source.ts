// import { DataSource, DataSourceOptions } from 'typeorm';
// import { config } from 'dotenv';

// config({ path: '.env' });

// const dataSourceOptions: DataSourceOptions = {
//   type: 'postgres',
//   host: process.env.DB_HOST || 'localhost',
//   port: parseInt(process.env.DB_PORT || '5432', 10),
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   entities: [
//     __dirname +
//       '/src/infrastructure/database/entities/**/*.orm-entity{.ts,.js}',
//   ],
//   migrations: [
//     __dirname + '/src/infrastructure/database/migrations/*{.ts,.js}',
//   ],
//   synchronize: false, // Set to false in production
//   logging: process.env.NODE_ENV === 'development',
// };

// export default new DataSource(dataSourceOptions);

// data-source.ts
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

// Load .env file only if needed (e.g., running locally outside Docker)
// Docker Compose will set process.env variables directly.
if (process.env.NODE_ENV !== 'production') {
  // Or some other check if you run locally
  config({ path: '.env' });
}

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  // Use process.env directly, rely on Docker Compose to provide them
  host: process.env.DB_HOST, // Remove '|| localhost' if only running via docker
  port: parseInt(process.env.DB_PORT || '5432', 10), // Keep default for safety maybe
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    // Adjust the path based on where data-source.ts is relative to src
    // If data-source.ts is in the root, this should work after compilation (for JS)
    // For ts-node, it might need adjusting depending on tsconfig paths
    __dirname + '/dist/infrastructure/database/entities/**/*.orm-entity.js',
    // Keep TS path for development / ts-node execution
    __dirname + '/src/infrastructure/database/entities/**/*.orm-entity.ts',
  ],
  migrations: [
    // Adjust the path based on where data-source.ts is relative to src
    __dirname + '/dist/infrastructure/database/migrations/*{.js}',
    // Keep TS path for development / ts-node execution
    __dirname + '/src/infrastructure/database/migrations/*{.ts}',
  ],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
};

// Validate required variables
if (
  !dataSourceOptions.host ||
  !dataSourceOptions.username ||
  !dataSourceOptions.password ||
  !dataSourceOptions.database
) {
  console.error(
    'Error: Missing database configuration in environment variables!',
  );
  // Optionally throw an error, but TypeORM might handle it later
  // throw new Error("Missing database configuration");
} else {
  console.log(
    `DB Config Loaded: Host=${dataSourceOptions.host}, User=${dataSourceOptions.username}, DB=${dataSourceOptions.database}`,
  ); // Debug log
}

export default new DataSource(dataSourceOptions);
