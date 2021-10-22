import ProductsHelpers from './products/products.js'
import express from "express";
const app = express();
const port = process.env.PORT ?? 3000;
const PRODUCTS_URL = "/products"

app.get(PRODUCTS_URL, (req, res, next) => {
  try {
    const products = ProductsHelpers.getProducts();
    if (products) {
      res.status(200).json({products})
    } else {
      res.status(400).json({errorMessage: "Products not found"})
    }
  } catch (e) {
    next(e);
  }
})

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