import { PrismaClient } from '@prisma/client';
import authorizedUser from './repository/default-authorized-user.json';
import logger from '../../../helpers/logger';
import { hashPassword } from '../../../helpers/hash';

const prisma = new PrismaClient();

async function insertDefaultAuthorizedUser() {
  try {
    logger.info('Inserting Default Authorized User');
    const password = hashPassword(authorizedUser.password);
    await prisma.authorizedUser.upsert({
      where: { email: authorizedUser.email },
      update: {},
      create: {
        email: authorizedUser.email,
        firstName: authorizedUser.firstName,
        lastName: authorizedUser.lastName,
        phone: authorizedUser.phone,
        password,
      },
    });
    logger.info('Default Authorized User Inserted');
  } catch (error: any) {
    logger.error(`Default Authorized User insert. ${error}`);
  }
}

async function main() {
  await insertDefaultAuthorizedUser();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    logger.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
