import { markRaw } from 'vue';
import { ElMessageBox, ElMessageBoxOptions } from 'element-plus';
import { QuestionFilled } from '@element-plus/icons-vue';

/**
 * 获取url请求参数
 *
 * @param {string} paramName
 * @return {*}
 */
const getUrlParams = (paramName: string) => {
  const url = location.href;
  if (url.indexOf('?') === -1) {
    return null;
  }
  const params = url.split('?')?.[1];
  const param = new URLSearchParams(params);
  return param.get(paramName);
};

/**
 * 获取用户登录信息
 *
 * @return {*}
 */
const geCachetUserInfo = () => {
  const cacheLoginInfo = localStorage.getItem('loginInfo');
  if (cacheLoginInfo) {
    return JSON.parse(cacheLoginInfo);
  }
  return {};
};

/**
 *
 * 确认框
 * @param {string} message
 * @param {ElMessageBoxOptions} options
 * @return {*}
 */
const confirmMessageBox = (message: string, options?: ElMessageBoxOptions) => {
  return ElMessageBox.confirm(message, '提示', {
    ...options,
    type: 'warning',
    cancelButtonText: '取消',
    confirmButtonText: '确认',
    icon: markRaw(QuestionFilled),
  });
};

/**
 * 原生页面跳转
 *
 * @param {string} url
 */
const nativePageJump = (url: string) => {
  const origin = location.origin;
  window.location.href = `${origin}/#/${url}`;
};
export { getUrlParams, geCachetUserInfo, confirmMessageBox, nativePageJump };
