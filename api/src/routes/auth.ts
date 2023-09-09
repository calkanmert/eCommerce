import { Router } from 'express';
import validate from '../middlewares/validate';
import { loginSchema } from '../validations/auth';
import verifyAuthorizedUser from '../middlewares/verify-token';
import { authorizedUserLogin, getLoggedInAuthorizedUser, authorizedUserTokenRefresh } from '../controllers/auth';

const router = Router();

router.get('/authorized-user', verifyAuthorizedUser, getLoggedInAuthorizedUser);
router.post('/authorized-user/login', validate(loginSchema), authorizedUserLogin);
router.post('/authorized-user/refresh', authorizedUserTokenRefresh);

export default router;
