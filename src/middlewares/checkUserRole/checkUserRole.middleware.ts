import { NextFunction, Request, Response } from 'express';
import HttpException from '../../exceptions/exceptions';
import { UserService } from '../../service/user.service';

const userService = new UserService();

const checkUserRoleMiddleware = async (req: Request, resp: Response, next: NextFunction) => {
  const user = req.user;
  try {
    const userFullInfo = await userService.getUserByUsername(user.username);
    if (userFullInfo) {
      if (userFullInfo.role === 'buyer') {
        next();
      } else {
        throw new HttpException(403, 'Only buyers have access to requested endpoint.');
      }
    } else {
      throw new HttpException(404, 'User not found.');
    }
  } catch (err) {
    next(err);
  }
};

export default checkUserRoleMiddleware;
