<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useForm } from 'vee-validate';
import formSchema from '@/form-schematics/login';
import isHasError from '@/helpers/is-has-error';
import Swal from 'sweetalert2';

const store = useAuthStore();
const router = useRouter();

const { login } = store;
const { values, errors, defineInputBinds } = useForm({
  validationSchema: formSchema,
});
const email = defineInputBinds('email');
const password = defineInputBinds('password');

async function onSubmit() {
  if (!isHasError(errors.value)) {
    const result = await login(values.email, values.password);
    if (!result.status) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: result.data.message,
      });
      return;
    }
    
    router.push({
      name: 'dashboard',
    });
  }
}
</script>

<template>
  <main class="d-flex w-100">
    <div class="container d-flex flex-column">
      <div class="row vh-100">
        <div class="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
          <div class="d-table-cell align-middle">
            <div class="text-center mt-4">
              <h1 class="h2">Welcome!</h1>
              <p class="lead">
                Sign in to your account to continue 
              </p>
            </div>
            <div class="card">
              <div class="card-body">
                <div class="m-sm-3">
                  <form @submit.prevent="onSubmit">
                    <div class="mb-3">
                      <label class="form-label">Email (admin@super.com)</label>
                      <input v-bind="email" :class="{ 'border border-danger': errors.email }" class="form-control form-control-lg" type="email" placeholder="Enter your email" />
                      <span class="text-danger" v-if="errors.email">{{ errors.email }}</span>
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Password (basicpassword)</label>
                      <input v-bind="password" :class="{ 'border border-danger': errors.password }" class="form-control form-control-lg" type="password" placeholder="Enter your password" />
                      <span class="text-danger" v-if="errors.password">{{ errors.password }}</span>
                    </div>
                    <div>
                      <div class="form-check align-items-center">
                        <input type="checkbox" class="form-check-input" />
                        <label class="form-check-label text-small">Remember me</label>
                      </div>
                    </div>
                    <div class="d-grid gap-2 mt-3">
                      <button type="submit" href="#" class="btn btn-lg btn-primary" :disabled="isHasError(errors)">Sign in</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>