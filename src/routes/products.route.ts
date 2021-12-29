import { Router, Response, Request, NextFunction } from 'express';
import { ProductsService } from '../service/products.service';
import HttpException from '../exceptions/exceptions';
import validationResultMiddleware from '../middlewares/validationResultHandler/validationResultHandler.middleware';
import { validateNewRatingSchema, validationProductsSchema } from '../validators/validationSchemas';
import authenticateTokenMiddleware from '../middlewares/authorization/authorization.middleware';
import checkUserRoleMiddleware from '../middlewares/checkUserRole/checkUserRole.middleware';

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
        if (data && data.length) {
          resp.status(200).json({ results: data });
        } else {
          throw new HttpException(404, 'Product(s) not found.');
        }
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/products/:id/rate',
    authenticateTokenMiddleware,
    checkUserRoleMiddleware,
    validateNewRatingSchema,
    validationResultMiddleware,
    (req: Request, resp: Response, next: NextFunction) => {
      resp.status(200).json({ result: 'success' });
    }
  );
};
