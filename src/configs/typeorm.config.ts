import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// Entity
import { Board } from 'src/apis/board/board.entity';

// Config
import * as cfg from 'config';
const config: any = cfg.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  // Database type
  type: config.type,
  host: process.env.DB_HOST || config.host,
  port: process.env.DB_PORT || config.port,
  username: process.env.DB_USERNAME || config.username,
  password: process.env.DB_PASSWORD || config.password,
  database: process.env.DB_DATABASE || config.database,
  // Entities to be loaded for this connection
  entities: [Board],
  // Synchronize
  synchronize: config.synchronize
}