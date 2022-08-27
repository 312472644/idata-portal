import axios, { AxiosRequestHeaders } from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';

const service = axios.create({
  baseURL: 'http://120.79.230.22:20112/diBus',
  timeout: 3000,
  withCredentials: true,
});

service.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('token');
    (config.headers as AxiosRequestHeaders)['token'] = token ? JSON.parse(token) : '';
    // 在发送请求之前做些什么
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    const { code, message } = response.data;
    if (code !== 200) {
      ElMessageBox.alert(message, '错误', {
        type: 'error',
        confirmButtonText: '确定',
      });
    }
    return response;
  },
  error => {
    ElMessage({
      message: '请求错误~',
      type: 'error',
    });
    return Promise.reject(error);
  }
);

export default service;
