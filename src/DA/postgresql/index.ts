import { createConnection } from 'typeorm';

const host = process.env['HOST'] || undefined;
const port = process.env['POSTGRESQL_PORT'] || undefined;
const username = process.env['POSTGRESQL_USERNAME'] || undefined;
const password = process.env['POSTGRESQL_PASSWORD'] || undefined;
const database = process.env['POSTGRESQL_DATABASE'] || undefined;

const postgreSQLConnect = async () => {
  if (host && port && username && password && database) {
    await createConnection({
      type: 'postgres',
      host,
      port: parseInt(port, 10),
      username,
      password,
      database
    }).then(
      () => {
        console.log('PostgreSQL connected.');
      },
      (e) => {
        console.error(e);
      }
    );
  } else {
    throw new Error('Missing one of PostgreSQL connection parameters');
  }
};

export default postgreSQLConnect;
