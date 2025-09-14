// src/utils/request.js
import axios from 'axios'
import { message } from 'antd';

const request = axios.create({
  // 重点：把 baseURL 改成你的本地服务地址
  baseURL: 'https://scheduled-work-flask.onrender.com', 
  withCredentials: true,
  timeout: 5000, // 超时时间保持不变
})

export default request
// 后续的拦截器代码不变...