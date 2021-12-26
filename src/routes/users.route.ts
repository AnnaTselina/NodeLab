import { NextFunction, Request, Response, Router } from 'express';
import { validationAuthenticationSchema, validationUserRegistrateSchema } from '../validators/validationSchemas';
import validationResultMiddleware from '../middlewares/validationResultHandler/validationResultHandler.middleware';
import { UserService } from '../service/user.service';
import HttpException from '../exceptions/exceptions';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from '../helpers/tokenHelpers';

const userService = new UserService();

export const UsersRouter = (router: Router): void => {
  router.post(
    '/register',
    validationUserRegistrateSchema,
    validationResultMiddleware,
    async (req: Request, resp: Response, next: NextFunction) => {
      const userData = req.body;
      try {
        const userExists = await userService.getUserByUsername(req.body.username);
        if (userExists) {
          next(new HttpException(400, `User with provided username ${req.body.username} already exists.`));
        } else {
          const resultUsername = await userService.createUser(userData);
          if (resultUsername) {
            resp.status(201).json({ message: `Account with username ${resultUsername} successfully created.` });
          } else {
            next(new HttpException(500, 'An error occured processing user create request.'));
          }
        }
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/authenticate',
    validationAuthenticationSchema,
    validationResultMiddleware,
    async (req: Request, resp: Response, next: NextFunction) => {
      const { username, password } = req.body;
      try {
        const user = await userService.getUserByUsername(username);
        if (user) {
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            const accessToken = generateAccessToken(username);
            const refreshToken = generateRefreshToken(username);
            if (accessToken && refreshToken) {
              resp.status(200).json({ accessToken, refreshToken });
            } else {
              next(new HttpException(500, 'Internal server error'));
            }
          } else {
            next(new HttpException(400, 'Incorrect password.'));
          }
        } else {
          next(new HttpException(400, 'User with provided username does not exist.'));
        }
      } catch (err) {
        next(err);
      }
    }
  );
};
