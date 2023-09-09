import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getById(id: string) {
  const authorizedUser = await prisma.authorizedUser.findUnique({
    where: {
      id,
    },
  });
  return authorizedUser;
}

async function getByEmail(email: string) {
  const authorizedUser = await prisma.authorizedUser.findUnique({
    where: {
      email,
    },
  });

  return authorizedUser;
}

export default {
  getById,
  getByEmail,
};
