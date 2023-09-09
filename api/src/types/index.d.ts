import { AuthorizedUser } from '../services/authorized-user';

export {};

declare global {
  namespace Express {
    interface Request {
      authorizedUser: AuthorizedUser;
    }
  }
}
