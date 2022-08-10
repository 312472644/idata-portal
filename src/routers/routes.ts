import Layout from '../layout/Layout.vue';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: 'Home',
    path: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        component: () => import('@pages/home/index.vue'),
      },
    ],
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@pages/login/index.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('../components/NotFound/index.vue'),
  },
];

export default routes;
