import { Router, Response, Request, NextFunction } from 'express';
import { ProductsService } from '../service/products.service';
import HttpException from '../exceptions/exceptions';
import validationResultMiddleware from '../middlewares/validationResultHandler/validationResultHandler.middleware';
import { validateNewRatingSchema, validationProductsSchema } from '../validators/validationSchemas';
import authenticateTokenMiddleware from '../middlewares/authorization/authorization.middleware';
import checkUserRoleMiddleware from '../middlewares/checkUserRole/checkUserRole.middleware';
import { UserService } from '../service/user.service';
import { UserRatingsService } from '../service/userRatings.service';

const productService = new ProductsService();
const userService = new UserService();
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
      const { rating } = req.body;
      let user = req.user;
      try {
        const product = await productService.getProductById(id);
        if (!product) {
          throw new HttpException(404, 'Product with provided id not found.');
        }
        if (!user._id) {
          const userInfo = await userService.getUserByUsername(user.username);
          if (userInfo) {
            user = userInfo;
          } else {
            throw new HttpException(404, 'User not found.');
          }
        }

        const existingUserRating = await userRatingsService.getUserRatingByProductId(user._id, id);
        const putRatingResult = existingUserRating
          ? await userRatingsService.updateRating(user._id, id, rating)
          : await userRatingsService.addRating(user._id, id, rating);

        const newProductTotalRating = await userRatingsService.countAverageProductRating(id);
        const updateTotalRatingResult = await productService.updateProductTotalRating(
          id,
          Number(newProductTotalRating)
        );

        if (putRatingResult && updateTotalRatingResult) {
          resp
            .status(existingUserRating ? 200 : 201)
            .json({ result: `Rating for products successfully ${existingUserRating ? 'updated' : 'added'}.` });
        } else {
          resp
            .status(500)
            .json({ result: `An error occured trying to ${existingUserRating ? 'update' : 'add'} rating.` });
        }
      } catch (err) {
        next(err);
      }
    }
  );
};
