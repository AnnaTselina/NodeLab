import express from "express";
import {getAllProducts} from '../databases/helpers/index.js';

const productRouter = express.Router();

productRouter.get('/', async (req, resp, next) => {
    try {
        const results = await getAllProducts();
        if (results) {
          resp.status(200).json({results});
        } else {
          resp.status(400).json({errorMessage: "Products not found"});
        }
      } catch(e) {
        next(e);
      }
})


export default productRouter;
