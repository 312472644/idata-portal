import { RouteRecordRaw } from 'vue-router';
import Layout from '../layout/Layout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/taskManager/taskList',
    meta: { title: '任务管理', icon: 'Setting' },
    component: Layout,
    children: [
      {
        path: '/taskManager/taskList',
        meta: { title: '任务列表' },
        component: () => import('@pages/taskManager/taskList/index.vue'),
      },
      {
        path: '/taskManager/executionRecord',
        meta: { title: '执行记录' },
        component: () => import('@pages/taskManager/executionRecord/index.vue'),
      },
      {
        path: '/taskManager/taskMonitor',
        meta: { title: '任务监控' },
        component: () => import('@pages/taskManager/taskMonitor/index.vue'),
      },
      {
        path: '/taskManager/dispatchLog',
        meta: { title: '调度日志' },
        component: () => import('@pages/taskManager/dispatchLog/index.vue'),
      },
    ],
  },
  {
    path: '/systemConfig/autConfig',
    meta: { title: '系统配置', icon: 'Setting' },
    component: Layout,
    children: [
      {
        path: '/systemConfig/autConfig',
        meta: { title: '认证配置' },
        component: () => import('@pages/systemConfig/autConfig/index.vue'),
      },
      {
        path: '/systemConfig/dataSourceConfig',
        meta: { title: '数据源配置' },
        component: () => import('@pages/systemConfig/dataSourceConfig/index.vue'),
      },
      {
        path: '/systemConfig/ruleConfig',
        meta: { title: '规则配置' },
        component: () => import('@pages/systemConfig/ruleConfig/index.vue'),
      },
      {
        path: '/systemConfig/globalConfig',
        meta: { title: '全局配置' },
        component: () => import('@pages/systemConfig/globalConfig/index.vue'),
      },
    ],
  },
  {
    path: '/systemManager/autConfig',
    meta: { title: '系统管理', icon: 'Setting' },
    component: Layout,
    children: [
      {
        path: '/systemManager/userManager',
        meta: { title: '用户管理' },
        component: () => import('@pages/systemManager/userManager/index.vue'),
      },
      {
        path: '/systemManager/roleManager',
        meta: { title: '角色管理' },
        component: () => import('@pages/systemManager/roleManager/index.vue'),
      },
      {
        path: '/systemManager/systemLog',
        meta: { title: '系统日志' },
        component: () => import('@pages/systemManager/systemLog/index.vue'),
      },
      {
        path: '/systemManager/license',
        meta: { title: 'license' },
        component: () => import('@pages/systemManager/license/index.vue'),
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
