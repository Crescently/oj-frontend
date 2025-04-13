import { history, RequestConfig } from '@umijs/max';
import { BACKEND_HOST_LOCAL, BACKEND_HOST_PROD } from '@/constants';
import { message } from 'antd';

const isDev = process.env.NODE_ENV === 'development';

export const requestConfig: RequestConfig = {
  baseURL: isDev ? BACKEND_HOST_LOCAL : BACKEND_HOST_PROD,
  // 配置携带cookie
  withCredentials: true,
  // 请求拦截器
  requestInterceptors: [
    (config: any) => {
      const token = localStorage.getItem("token")
      if (token) {
        config.headers.Authorization = token
      }
      return config;
    },
  ],
  // 响应拦截器
  responseInterceptors: [
    (response: any) => {
      // 拦截响应数据，进行个性化处理
      const data = response.data as API.BaseResponse;
      if (data.code === 401) {
        message.error('未登录');
        history.push('/user/login');
      }
      return response;
    },
  ],
};
