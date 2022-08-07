const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: 'Home',
    path: '/home',
    component: () => import('@pages/home/index.vue'),
  },
];

export default routes;
