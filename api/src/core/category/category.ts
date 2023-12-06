import { PrismaClient } from '@prisma/client';
import xss from 'xss';

interface CategoryInterface {
  id: string;
  name: string;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const prisma = new PrismaClient();

class Category {
  id: string;
  name: string;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: CategoryInterface) {
    this.setProperties(data);
  }

  get data() {
    return {
      id: this.id,
      name: this.name,
      enabled: this.enabled,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  setProperties(params: CategoryInterface) {
    this.id = params.id;
    this.name = params.name;
    this.enabled = params.enabled;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }

  static async create(data: { name: string; enabled: boolean }) {
    data.name = xss(data.name);
    const category = await prisma.category.create({
      data,
    });
    return new Category(category);
  }

  static async getById(id: string) {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    return new Category(category);
  }

  // static async getByQuery(query: any) {

  // }
}

export default Category;
