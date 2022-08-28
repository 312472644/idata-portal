import { nativePageJump } from '@utils/index';
import { AxiosResponse } from 'axios';
import { ElMessageBox } from 'element-plus';

const redirectLogin = (code: number, message: string) => {
  // token失效、错误、缺失会跳转值登录页面
  if ([40101, 40102, 40103, 40104].includes(code)) {
    nativePageJump(`login?referrer=${encodeURIComponent(location.href)}`);
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
    redirectLogin(code, message);
  }
  return response;
};

export { interceptResponse };
