import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import axios from '@/libs/axios';
import errorMessageHelper from '../helpers/error-message-helper';
import { Category } from '@/models/category';

export const useCategoryStore = defineStore('categoryStore', () => {
  // const categories: Ref<Category[]> = ref(new Category());

  async function create(name: string, enabled?: boolean) {
    try {
      const response = await axios.post('/categories', {
        name,
        enabled,
      });

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

  return { create };
});
