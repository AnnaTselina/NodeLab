import { NextFunction, Request, Response, Router } from 'express';
import {
  validationAuthenticationSchema,
  validationUserRegistrateSchema,
  validationRefreshTokenSchema,
  validateUpdateUserInfoSchema,
  validateUpdatePasswordSchema
} from '../validators/validationSchemas';
import validationResultMiddleware from '../middlewares/validationResultHandler/validationResultHandler.middleware';
import { UserService } from '../service/user.service';
import HttpException from '../exceptions/exceptions';
import bcrypt from 'bcrypt';
import {
  deauthenticateRefreshToken,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
} from '../helpers/tokenHelpers';
import authenticateTokenMiddleware from '../middlewares/authorization/authorization.middleware';

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
            const accessToken = generateAccessToken(username, user._id);
            const refreshToken = generateRefreshToken(username, user._id);
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

  router.post(
    '/token',
    validationRefreshTokenSchema,
    validationResultMiddleware,
    (req: Request, resp: Response, next: NextFunction) => {
      const { token } = req.body;
      try {
        const result = verifyRefreshToken(token);
        if (result) {
          const newAccessToken = generateAccessToken(result['username'], result['_id']);
          if (newAccessToken) {
            resp.status(200).json({ accessToken: newAccessToken });
          } else {
            next(new HttpException(500, 'Internal server error'));
          }
        } else if (result === false) {
          next(new HttpException(403, 'Not allowed.'));
        } else {
          next(new HttpException(500, 'Internal server error.'));
        }
      } catch (err) {
        next(err);
      }
    }
  );

  //for deleting refresh token
  router.post(
    '/logout',
    validationRefreshTokenSchema,
    validationResultMiddleware,
    (req: Request, resp: Response, next: NextFunction) => {
      const { token } = req.body;
      try {
        const deauthResult = deauthenticateRefreshToken(token);
        if (deauthResult) {
          resp.status(204).json({});
        } else {
          next(new HttpException(404, 'Logout unsuccessful. Check token.'));
        }
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    '/profile',
    authenticateTokenMiddleware,
    validateUpdateUserInfoSchema,
    validationResultMiddleware,
    async (req: Request, resp: Response, next: NextFunction) => {
      const username = req.user.username;
      const newUserData = req.body;
      try {
        const user = await userService.getUserByUsername(username);
        if (user) {
          const updateResult = await userService.updateUserInfo(username, newUserData);
          if (updateResult) {
            resp.status(200).json({ result: updateResult });
          } else {
            next(new HttpException(500, 'An error occured processing user update request.'));
          }
        } else {
          next(new HttpException(400, 'User not found.'));
        }
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/profile/password',
    authenticateTokenMiddleware,
    validateUpdatePasswordSchema,
    validationResultMiddleware,
    async (req: Request, resp: Response, next: NextFunction) => {
      const username = req.user.username;
      const { oldPassword, newPassword } = req.body;
      try {
        const user = await userService.getUserByUsername(username);
        if (user) {
          const passwordMatch = await bcrypt.compare(oldPassword, user.password);
          if (passwordMatch) {
            const passwordUpdated = await userService.updateUserPassword(username, newPassword);
            if (passwordUpdated) {
              resp.status(200).json({ result: 'Password successfully updated.' });
            } else {
              next(new HttpException(500, 'An error occured processing password update request.'));
            }
          } else {
            next(new HttpException(400, 'Incorrect old password.'));
          }
        } else {
          next(new HttpException(400, 'User not found.'));
        }
      } catch (err) {
        next(err);
      }
    }
  );
};
