import { NextFunction, Request, Response } from 'express';
import ApiError from '../helpers/api-error';
import AuthorizedUserAuth from '../core/auth/authorized-user-auth';
import AuthorizedUserToken from '../core/token/authorized-user-token';

async function authorizedUserLogin(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const auth = await AuthorizedUserAuth.authenticate(email, password);

    res.json({
      tokens: {
        access: auth.token.access,
        refresh: auth.token.refresh,
      },
    });
  } catch (e) {
    next(e);
  }
}

async function getLoggedInAuthorizedUser(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(req.authorizedUserAuth.user.data);
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
    const tokens = await AuthorizedUserToken.getByRefreshToken(token.toString());
    await tokens.refreshToken();
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
