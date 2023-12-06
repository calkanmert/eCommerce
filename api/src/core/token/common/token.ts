import { verify } from 'jsonwebtoken';
import config from '../../../config';
import tokenHelper from '../../../helpers/token-helper';

export interface TokenData {
  id?: string;
  authorizedUserId: string;
  access: string;
  refresh: string;
  access_enabled: boolean;
  refresh_enabled: boolean;
  created_at?: Date;
  updatedAt?: Date;
}

class Token {
  id?: string;
  authorizedUserId: string;
  access: string;
  refresh: string;
  accessEnabled: boolean;
  refreshEnabled: boolean;
  public model: any;

  constructor(params: TokenData, model: any) {
    this.setProperties(params);
    this.model = model;
  }

  setProperties(params: TokenData) {
    this.id = params.id;
    this.authorizedUserId = params.authorizedUserId;
    this.access = params.access;
    this.refresh = params.refresh;
    this.accessEnabled = params.access_enabled;
    this.refreshEnabled = params.refresh_enabled;
  }

  async disableRefresh() {
    this.checkId();

    const token = await this.model.update({
      where: {
        id: this.id,
      },
      data: {
        refresh_enabled: false,
      },
    });

    this.setProperties(token);
    return token;
  }

  async disableAccess() {
    this.checkId();

    const token = await this.model.update({
      where: {
        id: this.id,
      },
      data: {
        access_enabled: false,
      },
    });

    this.setProperties(token);
    return token;
  }

  async verifyRefresh() {
    const token = this.refresh;
    const secret = config.JWT_REFRESH_TOKEN_SECRET;

    if (!this.refreshEnabled) {
      throw new Error('INVALID_TOKEN');
    }

    try {
      return verify(token, secret);
    } catch (err: any) {
      if (err.message === 'jwt expired') {
        await this.disableRefresh();
        err.message = 'REFRESH_TOKEN_EXPIRED';
      }
      throw new Error(err);
    }
  }

  async verifyAccess() {
    const token = this.access;
    const secret = config.JWT_ACCESS_TOKEN_SECRET;

    if (!this.accessEnabled) {
      throw new Error('INVALID_TOKEN');
    }

    try {
      return verify(token, secret);
    } catch (err: any) {
      if (err.message === 'jwt expired') {
        await this.disableAccess();
        err.message = 'ACCESS_TOKEN_EXPIRED';
      }

      throw err;
    }
  }

  async refreshToken() {
    this.verifyRefresh();
    const { access, refresh } = tokenHelper.createTokens({ id: this.authorizedUserId });

    const createdToken = await this.model.create({
      data: {
        authorizedUserId: this.authorizedUserId,
        access,
        refresh,
        access_enabled: true,
        refresh_enabled: true,
      },
    });
    this.setProperties(createdToken);
    return createdToken;
  }

  private checkId() {
    if (!this.id) {
      throw new Error('TOKEN_ID_REQUIRED');
    }

    return true;
  }
}

export default Token;
