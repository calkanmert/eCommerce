<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useForm } from 'vee-validate';
import formSchema from '@/form-schematics/login';
import Swal from 'sweetalert2';
import { capitalizeFirstLetter } from '@/helpers/string-helper';

const store = useAuthStore();
const router = useRouter();

const { login } = store;
const { values, errors, defineInputBinds, meta } = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: 'admin@super.com',
    password: 'basicpassword',
  },
});
const email = defineInputBinds('email');
const password = defineInputBinds('password');

const spinnerState = ref(false);

async function onSubmit() {
  spinnerState.value = true;
  const result = await login(values.email, values.password);
  if (!result.status) {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: result.data.message,
    });
    spinnerState.value = false;
    return;
  }
  
  router.push({
    name: 'welcome',
  });
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
                      <label class="form-label">Email</label>
                      <input v-bind="email" :class="{ 'border border-danger': errors.email }" class="form-control form-control-lg" type="email" placeholder="Enter your email" />
                      <span class="text-danger" v-if="errors.email">{{ capitalizeFirstLetter(errors.email) }}.</span>
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Password</label>
                      <input v-bind="password" :class="{ 'border border-danger': errors.password }" class="form-control form-control-lg" type="password" placeholder="Enter your password" />
                      <span class="text-danger" v-if="errors.password">{{ capitalizeFirstLetter(errors.password) }}.</span>
                    </div>
                    <div>
                      <div class="form-check align-items-center">
                        <input type="checkbox" class="form-check-input" />
                        <label class="form-check-label text-small">Remember me</label>
                      </div>
                    </div>
                    <div class="d-grid gap-2 mt-3">
                      <button type="submit" href="#" class="btn btn-lg btn-primary" v-if="!spinnerState" :disabled="!meta.valid">Sign in</button>
                      <ProgressSpinner v-else style="width:40px; height:40px" strokeWidth="7" />
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