export default [
  {
    path: '/',
    name: 'main-layout',
    component: () => import('@/layouts/MainLayout.vue'),
    meta: {
      authRequired: true,
    },
    children: [
      {
        path: '',
        name: 'welcome',
        component: () => import('@/views/WelcomeView.vue'),
      },
      {
        path: '/product/category',
        name: 'product.category',
        component: () => import('@/views/product/CategoryView.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
  },
];
