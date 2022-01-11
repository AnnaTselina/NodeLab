import { NextFunction, Request, Response, Router } from 'express';
import HttpException from '../../exceptions/exceptions';
import authenticateTokenMiddleware from '../../middlewares/authorization/authorization.middleware';
import checkUserRoleMiddleware from '../../middlewares/checkUserRole/checkUserRole.middleware';
import { ProductsService } from '../../service/products.service';

const productService = new ProductsService();

export const ProductsAdminRouter = (router: Router): void => {
  router.get(
    '/admin/products/:id',
    authenticateTokenMiddleware,
    (req, resp, next) => {
      checkUserRoleMiddleware(req, resp, next, 'admin');
    },
    async (req: Request, resp: Response, next: NextFunction) => {
      const { id } = req.params;
      try {
        const product = await productService.getProductById(id);
        if (product) {
          resp.status(200).json({ result: product });
        } else {
          throw new HttpException(404, `Product with id=${id} not found.`);
        }
      } catch (err) {
        next(err);
      }
    }
  );
};
