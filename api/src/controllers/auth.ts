import { NextFunction, Request, Response } from 'express';
import { loginAuthorizedUser, refreshAuthorizedUserToken } from '../services/auth';
import ApiError from '../helpers/api-error';

async function authorizedUserLogin(req: Request, res: Response, next: NextFunction) {
  try {
    const tokens = await loginAuthorizedUser(req.body);
    res.json({
      tokens,
    });
  } catch (e) {
    next(e);
  }
}

async function getLoggedInAuthorizedUser(req: Request, res: Response, next: NextFunction) {
  try {
    delete req.authorizedUser.password;
    res.json(req.authorizedUser);
  } catch (e) {
    next(e);
  }
}

async function authorizedUserTokenRefresh(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers['refresh-token'];
    if (!token) {
      throw new ApiError('Refresh token required', 401);
    }
    const tokens = await refreshAuthorizedUserToken(token.toString());
    res.json({
      tokens: {
        access: tokens.access,
        refresh: tokens.refresh,
      },
    });
  } catch (e) {
    next(e);
  }
}

export { authorizedUserLogin, getLoggedInAuthorizedUser, authorizedUserTokenRefresh };
