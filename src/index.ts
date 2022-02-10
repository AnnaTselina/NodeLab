import dotenv from 'dotenv';
dotenv.config();
import express, { Application } from 'express';
import { dbConnection } from './DA/DBManager';
import { ProductsRouter } from './routes/products.route';
import { CategoriesRouter } from './routes/categories.route';
import { UsersRouter } from './routes/users.route';
import { loggerMiddleware } from './middlewares/logger/logger.middleware';
import { errorHandlerMiddleware } from './middlewares/errorHandler/errorHadler.middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './documentation/swagger.json';
import { OrderListsRouter } from './routes/orderLists.route';
import { ProductsAdminRouter } from './routes/admin/products.admin.route';
import { CategoriesAdminRouter } from './routes/admin/categories.admin.route';

const app: Application = express();
app.use(express.json());
const port = process.env['PORT'] ?? 3000;
const router = express.Router();

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

app.use(loggerMiddleware);

app.use('/', router);

ProductsRouter(router);
CategoriesRouter(router);
UsersRouter(router);
OrderListsRouter(router);

ProductsAdminRouter(router);
CategoriesAdminRouter(router);

app.use(errorHandlerMiddleware);

app.use((req, res) => {
  res.status(404).json({ errorMessage: 'Page does not exist.' });
});

const startApp = () => {
  try {
    dbConnection().then(() => {
      app.listen(port, () => {
        console.log(`Server has been started on port ${port}...`);
      });
    });
  } catch (e) {
    console.log(e);
  }
};

startApp();
