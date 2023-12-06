import { Router } from 'express';
import validate from '../middlewares/validate';
import categorySchema from '../validations/category';
import verifyAuthorizedUser from '../middlewares/verify-token';
import { createCategory } from '../controllers/category';

const router = Router();

router.post('/', verifyAuthorizedUser, validate(categorySchema), createCategory);

export default router;
