import { history, RequestConfig } from '@umijs/max';
import { BACKEND_HOST_LOCAL } from '@/constants';
import { message } from 'antd';

export const requestConfig: RequestConfig = {
  baseURL: BACKEND_HOST_LOCAL,
  // 配置携带cookie
  withCredentials: true,
  // 请求拦截器
  requestInterceptors: [
    (config: any) => {
      return config;
    },
  ],
  // 响应拦截器
  responseInterceptors: [
    (response: any) => {
      // 拦截响应数据，进行个性化处理
      const data = response.data as API.BaseResponse;
      if (data.code === 40100) {
        message.error('未登录').then();
        history.push('/user/login');
      }
      return response;
    },
  ],
};
