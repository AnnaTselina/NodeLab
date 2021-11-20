import dotenv from 'dotenv';
dotenv.config();
import express, { Application, Request, Response, NextFunction } from 'express';
import HttpException from './exceptions/exceptions';
import { dbConnection } from './DA/DBManager';
import { ProductsRouter } from './routes/products.route';
import logger from './logger';

const app: Application = express();
const port = process.env['PORT'] ?? 3000;
const router = express.Router();

const generateApiLogMessage = (req: Request, resp: Response, next: NextFunction) => {
  const { method, url } = req;
  const { statusCode } = resp;
  const log = `${method}:${url} ${statusCode}`;
  logger.info(log);
  next();
};

app.use(generateApiLogMessage);

app.use('/', router);

ProductsRouter(router);

app.use((error: HttpException, req: Request, res: Response) => {
  if (error) {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    res.status(status).json({ errorMessage: message });
  }
});

app.all('*', (req, res) => {
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
