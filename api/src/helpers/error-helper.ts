const ERROR_CODES: any = {
  UNAUTHORIZED: 401,
};

const MESSAGES = [
  {
    message: 'ACCESS_TOKEN_EXPIRED',
    status: 'UNAUTHORIZED',
  },
  {
    message: 'REFRESH_TOKEN_EXPIRED',
    status: 'UNAUTHORIZED',
  },
];

function getStatusCodeByMessage(message: string) {
  const found = MESSAGES.find((item) => item.message === message);
  if (!found) {
    return null;
  }

  const code = ERROR_CODES[found.status];
  return code;
}

export default {
  getStatusCodeByMessage,
};
