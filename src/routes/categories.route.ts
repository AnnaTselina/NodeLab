import { Router, Response, Request, NextFunction } from 'express';
import { CategoryService } from '../service/categories.service';
import HttpException from '../exceptions/exceptions';
import validationResultMiddleware from '../middlewares/validationResultHandler/validationResultHandler.middleware';
import { validationCategorySchema } from '../validators/validationSchemas';

const categoryService = new CategoryService();

export const CategoriesRouter = (router: Router): void => {
  router.get('/categories', async (req: Request, resp: Response, next: NextFunction) => {
    try {
      const data = await categoryService.getCategories();
      if (data && data.length) {
        resp.status(200).json({ results: data });
      } else {
        throw new HttpException(404, 'Categories not found.');
      }
    } catch (err) {
      next(err);
    }
  });
  router.get(
    '/categories/:id',
    validationCategorySchema,
    validationResultMiddleware,
    async (req: Request, resp: Response, next: NextFunction) => {
      const { id } = req.params;
      const queryParams = req.query;
      try {
        const data = await categoryService.getCategoryById(id, queryParams);
        if (data) {
          resp.status(200).json({ results: data });
        } else {
          throw new HttpException(404, `Category with id=${id} not found.`);
        }
      } catch (err) {
        next(err);
      }
    }
  );
};
