import { Router, Response, Request, NextFunction } from 'express';
import HttpException from '../../exceptions/exceptions';
import authenticateTokenMiddleware from '../../middlewares/authorization/authorization.middleware';
import checkUserRoleMiddleware from '../../middlewares/checkUserRole/checkUserRole.middleware';
import { CategoryService } from '../../service/categories.service';
import { validateCreateCategorySchema } from '../../validators/validationSchemas';
import validationResultMiddleware from '../../middlewares/validationResultHandler/validationResultHandler.middleware';

const categoryService = new CategoryService();

export const CategoriesAdminRouter = (router: Router): void => {
  router.get(
    '/admin/categories/:id',
    authenticateTokenMiddleware,
    (req, resp, next) => {
      checkUserRoleMiddleware(req, resp, next, 'admin');
    },
    async (req: Request, resp: Response, next: NextFunction) => {
      const { id } = req.params;
      try {
        const result = await categoryService.getCategoryById(id, {});
        if (result) {
          resp.status(200).json({ result });
        } else {
          throw new HttpException(404, `Category with id=${id} not found.`);
        }
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/admin/categories',
    authenticateTokenMiddleware,
    (req: Request, resp: Response, next: NextFunction) => {
      checkUserRoleMiddleware(req, resp, next, 'admin');
    },
    validateCreateCategorySchema,
    validationResultMiddleware,
    async (req: Request, resp: Response, next: NextFunction) => {
      const { displayName, products } = req.body;
      try {
        const result = await categoryService.createCategory(displayName, products);
        if (result) {
          resp.status(201).json({ result });
        } else {
          throw new HttpException(500, 'An error occured trying to create new category.');
        }
      } catch (err) {
        next(err);
      }
    }
  );
};
