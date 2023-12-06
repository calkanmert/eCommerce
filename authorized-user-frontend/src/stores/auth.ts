import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import axios from '@/libs/axios';
import { AuthorizedUser } from '@/models/authorized-user';
import errorMessageHelper from '../helpers/error-message-helper';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('authStore', () => {
  const isAuthenticated = ref(false);
  const user: Ref<AuthorizedUser> = ref(new AuthorizedUser());

  function addTokensToStorage(tokens: { access: string, refresh: string }) {
    localStorage.setItem('ACCESS_TOKEN', tokens.access);
    localStorage.setItem('REFRESH_TOKEN', tokens.refresh);
  }

  function addUserToStorage(user: AuthorizedUser) {
    localStorage.setItem('USER', JSON.stringify(user));
  }

  function isHasTokens() {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    const refreshToken = localStorage.getItem('REFRESH_TOKEN');
    if (accessToken && refreshToken) {
      return true;
    }
    return false;
  }

  async function getAuthenticatedUser(): Promise<AuthorizedUser> {
    const { data } = await axios.get('/auth/authorized-user');
    user.value = data;
    addUserToStorage(data);
    isAuthenticated.value = true;
    return data;
  }

  async function login(email: string, password: string) {
    try {
      const response = await axios.post('/auth/authorized-user/login', {
        email,
        password,
      });
      
      isAuthenticated.value = true;
      addTokensToStorage(response.data.tokens);
      await getAuthenticatedUser();
      return {
        status: true,
        data: response.data,
      };
    } catch (err: any) {
      const message = errorMessageHelper(err);
      return {
        status: false,
        data: {
          message,
        },
      };
    }
  }

  async function tokenRefresh() {
    try {
      const response = await axios.post('/auth/authorized-user/refresh');
      addTokensToStorage(response.data.tokens);
    } catch (err) {
      const router = useRouter();
      router.push({
        name: 'login',
      });
    } 
  }

  async function init() {
    if (isHasTokens()) {
      await getAuthenticatedUser();
    }
  }

  return { isAuthenticated, tokenRefresh, init, login, user };
});
