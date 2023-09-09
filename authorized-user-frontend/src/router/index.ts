import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import routes from '@/router/routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from)  => {
  const { isAuthenticated } = useAuthStore();
  if (
    to.meta.authRequired
    && !isAuthenticated
  ) {
    return { name: 'login' };
  }
  
  return true;
});

export default router;
