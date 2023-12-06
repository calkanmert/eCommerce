import { PrismaClient } from '@prisma/client';
import Token, { TokenData } from './common/token';
import tokenHelper from '../../helpers/token-helper';

const prisma = new PrismaClient();

class AuthorizedUserToken extends Token {
  constructor(data: TokenData) {
    super(data, prisma.authorizedUserToken);
  }

  static async getByAccessToken(accessToken: string): Promise<AuthorizedUserToken> {
    const token = await prisma.authorizedUserToken.findUnique({
      where: {
        access: accessToken,
      },
    });

    return new AuthorizedUserToken(token);
  }

  static async getByRefreshToken(refreshToken: string): Promise<AuthorizedUserToken> {
    const token = await prisma.authorizedUserToken.findUnique({
      where: {
        refresh: refreshToken,
      },
    });

    return new AuthorizedUserToken(token);
  }

  static async create(userId: string): Promise<AuthorizedUserToken> {
    const { access, refresh } = tokenHelper.createTokens({ id: userId });
    const createdToken = await prisma.authorizedUserToken.create({
      data: {
        authorizedUserId: userId,
        access,
        refresh,
        access_enabled: true,
        refresh_enabled: true,
      },
    });

    return new AuthorizedUserToken(createdToken);
  }
}

export default AuthorizedUserToken;
