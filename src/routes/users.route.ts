import { NextFunction, Request, Response, Router } from 'express';
import { validationUserRegistrateSchema } from '../validators/validationSchemas';
import validationResultMiddleware from '../middlewares/validationResultHandler/validationResultHandler.middleware';

export const UsersRouter = (router: Router): void => {
  router.post(
    '/register',
    validationUserRegistrateSchema,
    validationResultMiddleware,
    (req: Request, resp: Response, next: NextFunction) => {
      console.log(req.body);
    }
  );
};
