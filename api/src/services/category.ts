import { Category, PrismaClient } from '@prisma/client';
import xss from 'xss';

const prisma = new PrismaClient();

interface CategoryData {
  name: string;
  enabled?: boolean;
}

async function create(data: CategoryData): Promise<Category> {
  data.name = xss(data.name);
  const category = await prisma.category.create({
    data,
  });
  return category;
}

export default {
  create,
};
