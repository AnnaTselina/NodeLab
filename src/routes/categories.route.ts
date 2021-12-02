import { Router, Response, Request, NextFunction } from 'express';
import { CategoryService } from '../service/categories.service';
import HttpException from '../exceptions/exceptions';

const categoryService = new CategoryService();

export const CategoriesRouter = (router: Router): void => {
  router.get('/categories', async (req: Request, resp: Response, next: NextFunction) => {
    try {
      const data = await categoryService.getCategories();
      if (data) {
        resp.status(200).json({ results: data });
      } else {
        throw new HttpException(400, 'Categories not found');
      }
    } catch (err) {
      next(err);
    }
  });
};
