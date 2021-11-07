import express, {Application, Request, Response, NextFunction} from "express";
import {dbConnection} from './DA/DBManager';
import {ProductRouter} from './routes/products.route';

const app: Application = express();
const port = process.env.PORT ?? 3000;
const router = express.Router();

dbConnection();

app.use('/', router);

ProductRouter(router);

app.use((error: {message: string}, req: Request, res: Response, next: NextFunction)=>{
  if (error) {
    res.status(500).json({errorMessage: error.message});
  }
})

app.all('*', (req, res) => {
  res.status(404).json({errorMessage: "Page does not exist."});
});

app.listen(port, () => {
  console.log(`Server has been started on port ${port}...`)
})