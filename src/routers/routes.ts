import { RouteRecordRaw } from 'vue-router';
import Layout from '../layout/Layout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/taskManager/taskList',
    meta: {
      title: '任务管理',
      icon: 'icon-viewgallery',
      id: '1',
    },
    component: Layout,
    children: [
      {
        path: '/taskManager/taskList',
        meta: { title: '任务列表', id: '1-1' },
        component: () => import('@pages/taskManager/taskList/index.vue'),
      },
      {
        path: '/taskManager/taskDetail',
        meta: { title: '任务详情', id: '1-1-1', hidden: true },
        component: () => import('@pages/taskManager/taskDetail/index.vue'),
      },
      {
        path: '/taskManager/createTask',
        meta: { title: '创建任务', id: '1-1-2', hidden: true, parentPath: '/taskManager/taskList' },
        component: () => import('@pages/taskManager/createTask/index.vue'),
      },
      {
        path: '/taskManager/createTaskStep',
        meta: { title: '创建任务步骤', id: '1-1-3', hidden: true, parentPath: '/taskManager/taskList' },
        component: () => import('@pages/taskManager/createTask/components/createTaskStep.vue'),
      },
      {
        path: '/taskManager/createFieldMapping',
        meta: { title: '创建字段映射', id: '1-1-4', hidden: true, parentPath: '/taskManager/taskList' },
        component: () => import('@pages/taskManager/createTask/components/createFieldMapping.vue'),
      },
      {
        path: '/taskManager/executionRecord',
        meta: { title: '执行记录', id: '1-2' },
        component: () => import('@pages/taskManager/executionRecord/index.vue'),
      },
      {
        path: '/taskManager/taskMonitor',
        meta: { title: '任务监控', id: '1-3' },
        component: () => import('@pages/taskManager/taskMonitor/index.vue'),
      },
      {
        path: '/taskManager/dispatchLog',
        meta: { title: '调度日志', id: '1-4' },
        component: () => import('@pages/taskManager/dispatchLog/index.vue'),
      },
    ],
  },
  {
    path: '/systemConfig',
    redirect: '/systemConfig/authConfig',
    meta: { title: '系统配置', icon: 'icon-system', id: '2' },
    component: Layout,
    children: [
      {
        path: '/systemConfig/authConfig',
        meta: { title: '认证配置', id: '2-1' },
        component: () => import('@pages/systemConfig/authConfig/index.vue'),
      },
      {
        path: '/systemConfig/dataSourceConfig',
        meta: { title: '数据源配置', id: '2-2' },
        component: () => import('@pages/systemConfig/dataSourceConfig/index.vue'),
      },
      {
        path: '/systemConfig/ruleConfig',
        meta: { title: '规则配置', id: '2-3' },
        component: () => import('@pages/systemConfig/ruleConfig/index.vue'),
      },
      {
        path: '/systemConfig/globalConfig',
        meta: { title: '数据字典配置', id: '2-4' },
        component: () => import('@pages/systemConfig/globalConfig/index.vue'),
      },
    ],
  },
  {
    path: '/systemManager/authConfig',
    meta: { title: '系统管理', icon: 'icon-set', id: '3' },
    component: Layout,
    children: [
      {
        path: '/systemManager/userManager',
        meta: { title: '用户管理', id: '3-1' },
        component: () => import('@pages/systemManager/userManager/index.vue'),
      },
      {
        path: '/systemManager/roleManager',
        meta: { title: '角色管理', id: '3-2' },
        component: () => import('@pages/systemManager/roleManager/index.vue'),
      },
      {
        path: '/systemManager/systemLog',
        meta: { title: '系统日志', id: '3-3' },
        component: () => import('@pages/systemManager/systemLog/index.vue'),
      },
      {
        path: '/systemManager/license',
        meta: { title: 'license', id: '3-4' },
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
    name: 'Register',
    path: '/register',
    meta: { hidden: true },
    component: () => import('@pages/register/index.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    meta: { hidden: true },
    component: () => import('../components/NotFound/index.vue'),
  },
];

export default routes;
