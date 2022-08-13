import { IRouter } from '@interface/index';
import { createRouter, createWebHashHistory } from 'vue-router';
import progress from '@utils/progress';
import routes from './routes';

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  progress.start();
  next();
});
router.afterEach(() => {
  progress.done();
});

export default router as IRouter;
