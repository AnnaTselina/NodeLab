import { MongoMemoryServer } from 'mongodb-memory-server';
import { mongoose } from '@typegoose/typegoose';
import testUsersRoutes from './routes/users-route-test';
import testProductRoutes from './routes/products-route-test';

describe('Integration tests: ', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
  testUsersRoutes();
  testProductRoutes();
});
