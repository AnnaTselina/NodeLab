import { createConnection } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { CategoryEntity } from './entities/category.entity';
import logger from '../../logger';
import { UserEntity } from './entities/user.entity';
import { UserRatings } from './entities/userRatings.entity';

const host = process.env['HOST'];
const port = process.env['POSTGRESQL_PORT'];
const username = process.env['POSTGRESQL_USERNAME'];
const password = process.env['POSTGRESQL_PASSWORD'];
const database = process.env['POSTGRESQL_DATABASE'];

const postgreSQLConnect = async () => {
  if (host && port && username && password && database) {
    await createConnection({
      type: 'postgres',
      host,
      port: parseInt(port, 10),
      username,
      password,
      database,
      entities: [ProductEntity, CategoryEntity, UserEntity, UserRatings],
      synchronize: true,
      logging: process.env['NODE_ENV'] === 'dev'
    }).then(
      () => {
        logger.info('PostgreSQL connected.');
      },
      (e) => {
        logger.error(`PostgreSQL connection failed: ${e.message}`);
      }
    );
  } else {
    throw new Error('Missing one of PostgreSQL connection parameters');
  }
};

export default postgreSQLConnect;
