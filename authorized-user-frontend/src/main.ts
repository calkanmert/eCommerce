import '@/assets/css/fonts.css';
import '@/assets/css/main.css';
import '@/assets/js/app.js';
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/lara-light-blue/theme.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import App from '@/App.vue';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import VueFeather from 'vue-feather';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Badge from 'primevue/badge';
import DynamicDialog from 'primevue/dynamicdialog';
import Dialog from 'primevue/dialog';
import DialogService from 'primevue/dialogservice';
import Checkbox from 'primevue/checkbox';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import ProgressSpinner from 'primevue/progressspinner';

const app = createApp(App);

app.use(createPinia());

await (async () => {
  const store = useAuthStore();
  await store.init();
})();

app.use(router);
app.use(PrimeVue);
app.use(DialogService);
app.use(ToastService);

app.component(VueFeather.name, VueFeather);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('InputText', InputText);
app.component('Button', Button);
app.component('Badge', Badge);
app.component('DynamicDialog', DynamicDialog);
app.component('Dialog', Dialog);
app.component('Checkbox', Checkbox);
app.component('Toast', Toast);
app.component('ProgressSpinner', ProgressSpinner);

app.mount('#app');
