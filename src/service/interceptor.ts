import { nativePageJump } from '@utils/index';
import { AxiosResponse } from 'axios';
import { ElMessageBox } from 'element-plus';
import store from '../store';

const redirectLogin = (code: number, message: string) => {
  // token错误、缺失会跳转值登录页面
  if ([40101, 40102, 40103].includes(code)) {
    nativePageJump(`login?referrer=${encodeURIComponent(location.href)}`);
  }
  // token失效显示登录弹框
  else if (code === 40104) {
    store.commit('changeIsTokenTimeout', true);
  } else {
    ElMessageBox.alert(message, '错误', {
      type: 'error',
      confirmButtonText: '确定',
    });
  }
};

const interceptResponse = (response: AxiosResponse<any, any>) => {
  const { code, message } = response.data;
  if (code !== 200) {
    console.error('错误消息', message);
    redirectLogin(code, message);
  }
  return response;
};

export { interceptResponse };
