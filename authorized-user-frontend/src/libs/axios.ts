import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const tokenRequiredRoutes = [
  '/auth/authorized-user',
  '/categories',
];

const tokenRefreshRoute = '/auth/authorized-user/refresh';

const instance = axios.create({
  baseURL: 'http://localhost:3200/',
});

instance.interceptors.request.use((request) => {
  if (tokenRequiredRoutes.includes(request.url as string)) {
    request.headers['access-token'] = localStorage.getItem('ACCESS_TOKEN');
  }

  if (tokenRefreshRoute === request.url) {
    request.headers['refresh-token'] = localStorage.getItem('REFRESH_TOKEN');
  }

  return request;
});

instance.interceptors.response.use(
  (response) => response, 
  async (error) => {
    const originalRequest = error.config;
    const store = useAuthStore();

    try {
      switch (error.response.data.message) {
        case 'ACCESS_TOKEN_EXPIRED':
          await store.tokenRefresh();
          return await instance(originalRequest);
        case 'INVALID_TOKEN' || 'REFRESH_TOKEN_EXPIRED':
          localStorage.removeItem('REFRESH_TOKEN');
          localStorage.removeItem('ACCESS_TOKEN');
          localStorage.removeItem('USER');
          window.location.href = '/login';
          break;
      }
    } catch (retryError) {
      Promise.reject(retryError);
    }
    
    return Promise.reject(error);
  },
);

export default instance;
