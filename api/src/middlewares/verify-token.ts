import { NextFunction, Request, Response } from 'express';
import { verifyAuthorizedUserToken } from '../services/auth';
import ApiError from '../helpers/api-error';
import AuthorizedUser from '../services/authorized-user';

function throwUnauthorizedAccess() {
  throw new ApiError('Unauthorized access', 401);
}

async function verifyAuthorizedUser(req: Request, res: Response, next: NextFunction) {
  try {
    const accessToken = req.headers['access-token'];
    if (!accessToken) {
      throwUnauthorizedAccess();
    }
    const tokenData = await verifyAuthorizedUserToken(accessToken.toString());
    if (typeof tokenData !== 'string') {
      const user = await AuthorizedUser.getById(tokenData.id);
      if (!user) {
        throwUnauthorizedAccess();
      }
      req.authorizedUser = user;
      next();
    }
  } catch (e) {
    next(e);
  }
}

export default verifyAuthorizedUser;
