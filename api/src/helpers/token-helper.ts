import { sign } from 'jsonwebtoken';
import config from '../config';

function createTokens(payload: any) {
  const access = sign(payload, config.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '5s' });
  const refresh = sign(payload, config.JWT_REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
  return {
    access,
    refresh,
  };
}

export default {
  createTokens,
};
