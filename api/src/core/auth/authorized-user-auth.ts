import AuthorizedUser from '../user/authorized-user';
import AuthorizedUserToken from '../token/authorized-user-token';
import { comparePasswords } from '../../helpers/hash';

class AuthorizedUserAuth {
  user: AuthorizedUser;
  token: AuthorizedUserToken;

  constructor(user: AuthorizedUser, token: AuthorizedUserToken) {
    this.setProperties(user, token);
  }

  setProperties(user: AuthorizedUser, token: AuthorizedUserToken) {
    this.user = user;
    this.token = token;
  }

  static async authenticate(email: string, password: string) {
    const user = await AuthorizedUser.getByEmail(email);
    if (!user) {
      throw new Error('NO_USER_WITH_THIS_EMAIL');
    }
    const validPassword = comparePasswords(password, user.password);
    if (!validPassword) {
      throw new Error('EMAIL_OR_PASSWORD_INCORRECT');
    }

    const token = await AuthorizedUserToken.create(user.id);

    return new AuthorizedUserAuth(user, token);
  }
}

export default AuthorizedUserAuth;
