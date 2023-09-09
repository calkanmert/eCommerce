import '@/assets/css/fonts.css';
import '@/assets/css/main.css';
import '@/assets/js/app.js';
import 'primevue/resources/themes/lara-light-indigo/theme.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import App from '@/App.vue';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import VueFeather from 'vue-feather';

const app = createApp(App);

app.use(createPinia());

await (async () => {
  const store = useAuthStore();
  await store.init();
})();

app.use(router);
app.use(PrimeVue);

app.component(VueFeather.name, VueFeather);

app.mount('#app');
