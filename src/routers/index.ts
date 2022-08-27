import { IRouter } from '@interface/index';
import { createRouter, createWebHashHistory } from 'vue-router';
import progress from '@utils/progress';
import routes from './routes';

// 请求拦截白名单
const whiteList = ['Login', 'Register'];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token');
  if (!token && !whiteList.includes(to.name?.toString() as string)) {
    next({
      path: '/login',
      query: {
        referrer: encodeURIComponent(location.href),
      },
    });
  } else {
    progress.start();
    next();
  }
});
router.afterEach(() => {
  progress.done();
});

export default router as IRouter;
