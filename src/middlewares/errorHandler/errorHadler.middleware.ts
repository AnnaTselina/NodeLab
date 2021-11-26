import { Request, Response, NextFunction } from 'express';
import HttpException from '../../exceptions/exceptions';

export const errorHandlerMiddleware = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    res.status(status).json({ errorMessage: message });
  }
};
