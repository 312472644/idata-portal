import axios, { AxiosRequestHeaders } from 'axios';
import { ElMessage } from 'element-plus';
import { interceptResponse } from './interceptor';

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 3000,
  withCredentials: true,
});

service.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('token');
    const userName = sessionStorage.getItem('userName');
    (config.headers as AxiosRequestHeaders)['token'] = token ? JSON.parse(token) : '';
    (config.headers as AxiosRequestHeaders)['user'] = userName ? JSON.parse(userName) : '';
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    return interceptResponse(response);
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
