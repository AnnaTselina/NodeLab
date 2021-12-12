import { Router, Response, Request, NextFunction } from 'express';
import { ProductsService } from '../service/products.service';
import HttpException from '../exceptions/exceptions';
import validationResultMiddleware from '../middlewares/validationResultHandler/validationResultHandler.middleware';
import { validationProductsSchema } from '../validators/validationSchemas';

const productService = new ProductsService();

export const ProductsRouter = (router: Router): void => {
  router.get(
    '/products',
    validationProductsSchema,
    validationResultMiddleware,
    async (req: Request, resp: Response, next: NextFunction) => {
      const queryParams = req.query;
      try {
        const data = await productService.getProducts(queryParams);
        if (data) {
          resp.status(200).json({ results: data });
        } else {
          throw new HttpException(404, 'Product(s) not found');
        }
      } catch (err) {
        next(err);
      }
    }
  );
};
