import { NextFunction, Request, Response } from 'express';
import Category from '../core/category/category';
import { CategorySchema } from '../validations/category';

async function createCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const body: CategorySchema = req.body;
    const categoryData = {
      name: body.name,
      enabled: true,
    };

    if (body.enabled) {
      categoryData.enabled = Boolean(body.enabled);
    }

    const category = await Category.create(categoryData);
    const createdCategory = category.data;
    res.json({
      ...createdCategory,
    });
  } catch (e) {
    next(e);
  }
}

export { createCategory };
