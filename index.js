import express from "express";
import productRouter from './routes/Product.route.js';
import './databases/mongoDB/index.js';

const app = express();
const port = process.env.PORT ?? 3000;

app.use('/products', productRouter);

app.use((error, req, res, next)=>{
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