import { AvatarDropdown } from '@/components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { requestConfig } from './requestConfig';
import React from 'react';
import NoAuth from '@/pages/NoAuth';
import defaultSettings from '../config/defaultSettings';
import 'bytemd/dist/index.css';
import { getUserInfoUsingGet } from '@/services/onlinejudge-user-service/userController';
import logo from '../public/logo.png';
const loginPath = '/user/login';

export async function getInitialState(): Promise<InitialState> {
  const initialState: InitialState = {
    currentUser: undefined,
  };

  const { location } = history;
  if (location.pathname !== loginPath) {
    const res = await getUserInfoUsingGet();
    if (res.code === 0) {
      initialState.currentUser = res.data;
    }
  }
  return initialState;
}

// @ts-ignore
export const layout: RunTimeLayoutConfig = () => {
  return {
    avatarProps: {
      render: () => {
        return <AvatarDropdown />;
      },
    },
    logo: logo,
    // footerRender: () => <Footer />,
    menuHeaderRender: undefined,
    // 自定义 403 页面
    unAccessible: <NoAuth />,
    // 增加一个 loading 的状态
    ...defaultSettings,
  };
};

export const request = {
  ...requestConfig,
};
