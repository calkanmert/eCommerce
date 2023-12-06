import AuthorizedUserAuth from '../core/auth/authorized-user-auth';

export {};

declare global {
  namespace Express {
    interface Request {
      authorizedUserAuth: AuthorizedUserAuth;
    }
  }
}
