import express from "express";
import {getAllProducts} from '../databases/helpers/index.js';

const productRouter = express.Router();

productRouter.get('/', async (req, resp, next) => {
    try {
        const results = await getAllProducts();
        resp.send(results);

      } catch(e) {
        next(e);
      }
})


export default productRouter;
