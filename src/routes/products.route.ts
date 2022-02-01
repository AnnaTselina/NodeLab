import { Router, Response, Request, NextFunction } from 'express';
import { ProductsService } from '../service/products.service';
import HttpException from '../exceptions/exceptions';
import validationResultMiddleware from '../middlewares/validationResultHandler/validationResultHandler.middleware';
import { validateNewRatingSchema, validationProductsSchema } from '../validators/validationSchemas';
import authenticateTokenMiddleware from '../middlewares/authorization/authorization.middleware';
import checkUserRoleMiddleware from '../middlewares/checkUserRole/checkUserRole.middleware';
import { UserRatingsService } from '../service/userRatings.service';

const productService = new ProductsService();
const userRatingsService = new UserRatingsService();

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
    async (req: Request, resp: Response, next: NextFunction) => {
      const { id } = req.params;
      const { rating, comment } = req.body;
      let user = req.user;
      try {
        const rateResult = await userRatingsService.rateProduct(user._id, id, rating, comment);
        if (rateResult) {
          resp.status(200).json({ result: 'Product rating successfully updated.' });
        } else {
          throw new HttpException(500, 'An error occured trying to update product rating.');
        }
      } catch (err) {
        next(err);
      }
    }
  );

  router.get('/lastRatings', async (req: Request, resp: Response, next: NextFunction) => {
    try {
      const result = await userRatingsService.getLastTenRatings();
      if (result) {
        if (result.length) {
          resp.status(200).json({ result });
        } else {
          resp.status(404).json({ message: 'Last ratings not found.' });
        }
      } else {
        throw new HttpException(500, 'An error occurred trying to get last 10 ratings.');
      }
    } catch (err) {
      next(err);
    }
  });
};
