import { sign, verify, JwtPayload } from 'jsonwebtoken';
import AuthorizedUser from '../services/authorized-user';
import AuthorizedUserToken from '../services/authorized-user-token';
import logger from '../helpers/logger';
import { comparePasswords } from '../helpers/hash';
import config from '../config';
import ApiError from '../helpers/api-error';

async function createTokens(userId: string) {
  const access = sign({ id: userId }, config.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '5s' });
  const refresh = sign({ id: userId }, config.JWT_REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
  const tokens = await AuthorizedUserToken.create({
    authorizedUserId: userId,
    access,
    refresh,
    enabled: true,
  });

  return tokens;
}

async function loginAuthorizedUser(params: { email: string; password: string }) {
  const user = await AuthorizedUser.getByEmail(params.email);
  if (!user) {
    logger.warn(`There is no user with this email. ${params.email}`);
    throw new ApiError('Email or password incorrect.', 401);
  }

  logger.info(`User found. ${params.email}`);

  const validPassword = comparePasswords(params.password, user.password);
  if (!validPassword) {
    throw new ApiError('Email or password incorrect.', 401);
  }

  const tokens = await createTokens(user.id);

  return {
    access: tokens.access,
    refresh: tokens.refresh,
  };
}

async function verifyAuthorizedUserToken(accessToken: string): Promise<JwtPayload | string> {
  const token = await AuthorizedUserToken.getByAccessToken(accessToken);
  if (!token || (token && !token.enabled)) {
    throw new ApiError('The token is invalid', 401);
  }
  try {
    const result = verify(accessToken, config.JWT_ACCESS_TOKEN_SECRET);
    return result;
  } catch (err: any) {
    throw new ApiError('access token expired', 401);
  }
}

async function refreshAuthorizedUserToken(refreshToken: string) {
  const token = await AuthorizedUserToken.getByRefreshToken(refreshToken);
  if (!token || (token && !token.enabled)) {
    throw new ApiError('The token is invalid', 401);
  }
  try {
    const result = verify(refreshToken, config.JWT_REFRESH_TOKEN_SECRET);
    if (typeof result !== 'string') {
      await AuthorizedUserToken.disableToken(token.id);
      const tokens = createTokens(result.id);
      return tokens;
    }
  } catch (err: any) {
    if (err.message === 'jwt expired') {
      err.message = 'refresh token expired';
      await AuthorizedUserToken.disableToken(token.id);
    }
    throw new ApiError(err.message, 401);
  }
}

export { loginAuthorizedUser, verifyAuthorizedUserToken, refreshAuthorizedUserToken };
