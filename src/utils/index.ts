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
export { getUrlParams, geCachetUserInfo };
