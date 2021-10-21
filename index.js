import ProductsHelpers from './products/products.js'
import express from "express";
const app = express();
const port = process.env.PORT ?? 3000;
const PRODUCTS_URL = "/products"

app.get('/', (req, res) => {
  res.send('Listening to your requests.')
});

app.get(PRODUCTS_URL, (req, res) => {
    res.status(200);
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(ProductsHelpers.getProducts()));
})

app.listen(port, () => {
    console.log(`Server has been started on port ${port}...`)
  })