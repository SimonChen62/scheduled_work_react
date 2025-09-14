// src/utils/request.js
import axios from 'axios'
import { message } from 'antd';

const request = axios.create({
  baseURL: 'https://scheduled-work-flask.onrender.com', 
  withCredentials: true,
  timeout: 5000,
})

// 添加请求拦截器确保发送凭证
request.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器处理未登录情况
request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // 未登录时跳转到登录页
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default request;