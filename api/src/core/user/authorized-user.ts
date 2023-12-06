import { PrismaClient } from '@prisma/client';

interface AuthorizedUserInterface {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const prisma = new PrismaClient();

class AuthorizedUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: AuthorizedUserInterface) {
    this.setProperties(data);
  }

  get data() {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  setProperties(params: AuthorizedUserInterface) {
    this.id = params.id;
    this.email = params.email;
    this.firstName = params.firstName;
    this.lastName = params.lastName;
    this.phone = params.phone;
    this.password = params.password;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }

  static async getByEmail(email: string) {
    const authorizedUser = await prisma.authorizedUser.findUnique({
      where: {
        email,
      },
    });

    return new AuthorizedUser(authorizedUser);
  }

  static async getById(id: string) {
    const authorizedUser = await prisma.authorizedUser.findUnique({
      where: {
        id,
      },
    });

    return new AuthorizedUser(authorizedUser);
  }
}

export default AuthorizedUser;
