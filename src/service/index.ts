import axios, { AxiosRequestHeaders } from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 3000,
  withCredentials: true,
});

service.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('token');
    const userInfo = localStorage.getItem('loginInfo');
    (config.headers as AxiosRequestHeaders)['token'] = token ? JSON.parse(token) : '';
    (config.headers as AxiosRequestHeaders)['user'] = userInfo ? JSON.parse(userInfo)?.userName : '';
    return config;
  },
  error => {
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
