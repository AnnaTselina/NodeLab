import { NextFunction, Request, Response, Router } from 'express';
import authenticateTokenMiddleware from '../../middlewares/authorization/authorization.middleware';
import checkUserRoleMiddleware from '../../middlewares/checkUserRole/checkUserRole.middleware';

export const ProductsAdminRouter = (router: Router): void => {
  router.get(
    '/admin/products/:id',
    authenticateTokenMiddleware,
    (req, resp, next) => {
      checkUserRoleMiddleware(req, resp, next, 'admin');
    },
    (req: Request, resp: Response, next: NextFunction) => {}
  );
};
