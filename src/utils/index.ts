import { markRaw } from 'vue';
import { ElMessageBox, ElMessageBoxOptions } from 'element-plus';
import { QuestionFilled } from '@element-plus/icons-vue';
import { AxiosPromise } from 'axios';

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

/**
 * 删除单条数据
 *
 * @param {number} id 主键id
 * @param {(id: number) => AxiosPromise<any>} deleteApi 删除接口
 * @param {string} [message='确认删除该条数据?']
 * @return {*}  {Promise<Boolean>}
 */
const deleteSingleData = (
  id: number,
  deleteApi: (id: number) => AxiosPromise<any>,
  message = '确认删除该条数据?'
): Promise<Boolean> => {
  return new Promise(resolve => {
    confirmMessageBox(message).then(() => {
      deleteApi(id).then(res => {
        const { code, success } = res.data;
        if (code === 200 && success) {
          resolve(true);
        }
      });
    });
  });
};

/**
 * 设置表单数据
 *
 * @param {{ [x: string]: any }} targetData
 * @param {(Record<string, any> | undefined)} sourceData
 */
const setFormField = (targetData: { [x: string]: any }, sourceData: Record<string, any> | undefined) => {
  const propList = Object.keys(targetData);
  for (const fieldProp in sourceData) {
    if (propList.includes(fieldProp)) {
      targetData[fieldProp] = sourceData[fieldProp];
    }
  }
};
export { getUrlParams, geCachetUserInfo, confirmMessageBox, nativePageJump, deleteSingleData, setFormField };
