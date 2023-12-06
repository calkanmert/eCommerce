import { NextFunction, Request, Response } from 'express';
import ApiError from '../helpers/api-error';
import AuthorizedUser from '../core/user/authorized-user';
import AuthorizedUserToken from '../core/token/authorized-user-token';
import AuthorizedUserAuth from '../core/auth/authorized-user-auth';

function throwUnauthorizedAccess() {
  throw new ApiError('Unauthorized access', 401);
}

async function verifyAuthorizedUser(req: Request, res: Response, next: NextFunction) {
  try {
    const accessToken = req.headers['access-token'];
    if (!accessToken) {
      throwUnauthorizedAccess();
    }
    const token = await AuthorizedUserToken.getByAccessToken(accessToken.toString());
    await token.verifyAccess();
    const user = await AuthorizedUser.getById(token.authorizedUserId);
    if (!user.id) {
      throwUnauthorizedAccess();
    }
    req.authorizedUserAuth = new AuthorizedUserAuth(user, token);
    next();
  } catch (e: any) {
    const error = new ApiError(e.message);
    next(error);
  }
}

export default verifyAuthorizedUser;
