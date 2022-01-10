import { NextFunction, Request, Response, Router } from 'express';
import authenticateTokenMiddleware from '../middlewares/authorization/authorization.middleware';
import validationResultMiddleware from '../middlewares/validationResultHandler/validationResultHandler.middleware';
import { validateOrderListProductsSchema } from '../validators/validationSchemas';

export const OrderListsRouter = (router: Router): void => {
  router.post(
    '/order-list',
    authenticateTokenMiddleware,
    validateOrderListProductsSchema,
    validationResultMiddleware,
    (req: Request, resp: Response, next: NextFunction) => {}
  );
};
