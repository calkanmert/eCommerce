import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface createToken {
  authorizedUserId: string;
  access: string;
  refresh: string;
  enabled: boolean;
}

async function create(data: createToken) {
  const createdToken = await prisma.authorizedUserToken.create({
    data,
  });

  return createdToken;
}

async function getByAccessToken(accessToken: string) {
  const token = await prisma.authorizedUserToken.findUnique({
    where: {
      access: accessToken,
    },
  });

  return token;
}

async function getByRefreshToken(refreshToken: string) {
  const token = await prisma.authorizedUserToken.findUnique({
    where: {
      refresh: refreshToken,
    },
  });

  return token;
}

async function disableToken(id: string) {
  const token = await prisma.authorizedUserToken.update({
    where: {
      id,
    },
    data: {
      enabled: false,
    },
  });

  return token;
}

export default {
  create,
  getByAccessToken,
  getByRefreshToken,
  disableToken,
};
