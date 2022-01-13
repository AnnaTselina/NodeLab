import { NextFunction, Request, Response, Router } from 'express';
import HttpException from '../../exceptions/exceptions';
import authenticateTokenMiddleware from '../../middlewares/authorization/authorization.middleware';
import checkUserRoleMiddleware from '../../middlewares/checkUserRole/checkUserRole.middleware';
import validationResultMiddleware from '../../middlewares/validationResultHandler/validationResultHandler.middleware';
import { ProductsService } from '../../service/products.service';
import { validateCreateProductSchema } from '../../validators/validationSchemas';

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

  router.post(
    '/admin/products',
    authenticateTokenMiddleware,
    (req: Request, resp: Response, next: NextFunction) => {
      checkUserRoleMiddleware(req, resp, next, 'admin');
    },
    validateCreateProductSchema,
    validationResultMiddleware,
    async (req: Request, resp: Response, next: NextFunction) => {
      const { displayName, categories, price } = req.body;
      try {
        const createNewProductResult = await productService.createNewProduct(displayName, categories, price);
        if (createNewProductResult) {
          resp.status(201).json({ message: 'New product successfully created.', result: createNewProductResult });
        } else {
          throw new HttpException(500, 'An error occurred trying to create new product.');
        }
      } catch (err) {
        next(err);
      }
    }
  );
};
