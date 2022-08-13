import { RouteRecordRaw } from 'vue-router';
import Layout from '../layout/Layout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/system/globalConfig',
    meta: { title: '系统管理', icon: 'Setting' },
    component: Layout,
    children: [
      {
        path: '/system/globalConfig',
        meta: { title: '全局配置' },
        component: () => import('@pages/globalConfig/index.vue'),
      },
      {
        path: '/system/ruleConfig',
        meta: { title: '规则配置' },
        component: () => import('@pages/ruleConfig/index.vue'),
      },
      {
        path: '/system/sceneManager',
        meta: { title: '集成场景管理' },
        component: () => import('@pages/sceneManager/index.vue'),
      },
      {
        path: '/system/permissionManager',
        meta: { title: '权限配置' },
        component: () => import('@pages/permissionManager/index.vue'),
      },
      {
        path: '/system/execPlanManager',
        meta: { title: '执行计划管理' },
        component: () => import('@pages/execPlanManager/index.vue'),
      },
    ],
  },
  {
    name: 'Login',
    path: '/login',
    meta: { hidden: true },
    component: () => import('@pages/login/index.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    meta: { hidden: true },
    component: () => import('../components/NotFound/index.vue'),
  },
];

export default routes;
