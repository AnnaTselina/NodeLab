import { validationResult, ValidationError } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import HttpException from '../../exceptions/exceptions';

const validationResultMiddleware = (req: Request, resp: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors
      .array()
      .map((error: ValidationError) => `${error.msg} Check { ${error.param} : ${error.value} }`)
      .join('. ');

    next(new HttpException(400, message));
  } else {
    next();
  }
};

export default validationResultMiddleware;
