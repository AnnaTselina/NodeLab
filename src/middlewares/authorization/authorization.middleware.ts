import { NextFunction, Request, Response } from 'express';
import HttpException from '../../exceptions/exceptions';
import { verifyAccessToken } from '../../helpers/tokenHelpers';

const authenticateTokenMiddleware = (req: Request, resp: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const authResult = verifyAccessToken(token);
      if (authResult) {
        req.user = authResult;
        next();
      } else if (authResult === false) {
        next(new HttpException(403, 'Not allowed.'));
      } else {
        next(new HttpException(500, 'Internal server error'));
      }
    } else {
      next(new HttpException(401, 'Unauthorized.'));
    }
  } catch (err) {
    next(err);
  }
};

export default authenticateTokenMiddleware;
