import { App } from 'vue';

const usersPermissions = ['admin'];

/**
 * 判断用户是否有对于某个操作权限
 *
 * @param {App<Element>} app
 */
const permission = (app: App<Element>) => {
  app.directive('permission', {
    mounted(el, binding) {
      const { value = [] } = binding;
      const flag = usersPermissions.some(item => value.includes(item));
      if (!flag) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  });
};

export default permission;
