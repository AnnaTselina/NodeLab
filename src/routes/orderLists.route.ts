import { NextFunction, Request, Response, Router } from 'express';
import authenticateTokenMiddleware from '../middlewares/authorization/authorization.middleware';
import validationResultMiddleware from '../middlewares/validationResultHandler/validationResultHandler.middleware';
import { validateOrderListProductsSchema, validateOrderListIdSchema } from '../validators/validationSchemas';
import HttpException from '../exceptions/exceptions';
import { OrderListsService } from '../service/orderList.service';

const orderListService = new OrderListsService();

export const OrderListsRouter = (router: Router): void => {
  router.post(
    '/order-list',
    authenticateTokenMiddleware,
    validateOrderListProductsSchema,
    validationResultMiddleware,
    async (req: Request, resp: Response, next: NextFunction) => {
      const { products } = req.body;
      const user = req.user;
      try {
        const createOrderListResult = await orderListService.createOrderList(user._id, products);
        if (createOrderListResult) {
          resp
            .status(201)
            .json({ message: `Order list id=${createOrderListResult._id} created.`, result: createOrderListResult });
        } else {
          throw new HttpException(500, 'An error occured trying to create order list.');
        }
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    '/order-list',
    authenticateTokenMiddleware,
    validateOrderListIdSchema,
    validateOrderListProductsSchema,
    validationResultMiddleware,
    async (req: Request, resp: Response, next: NextFunction) => {
      const { orderList_id, products } = req.body;
      try {
        const updateProductsResult = await orderListService.updateOrderList(orderList_id, products);
        if (updateProductsResult) {
          resp.status(200).json({
            message: `Order list id=${updateProductsResult._id} successfully updated.`,
            result: updateProductsResult
          });
        } else {
          throw new HttpException(500, 'An error occured trying to update order list.');
        }
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/order-list/clear',
    authenticateTokenMiddleware,
    validateOrderListIdSchema,
    validationResultMiddleware,
    async (req: Request, resp: Response, next: NextFunction) => {
      const { orderList_id } = req.body;
      try {
        const clearResult = await orderListService.clearOrderList(orderList_id);
        if (clearResult) {
          resp.status(200).json({ message: `Order list id=${orderList_id} cleared.` });
        } else {
          throw new HttpException(500, `An error occured trying to clear order list id=${orderList_id}`);
        }
      } catch (err) {
        next(err);
      }
    }
  );
};
