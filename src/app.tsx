import { AvatarDropdown, Footer } from '@/components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { requestConfig } from './requestConfig';
import React from 'react';
import NoAuth from '@/pages/NoAuth';
import { getUserInfo } from '@/services/onlinejudge-backend/userController';
import defaultSettings from '../config/defaultSettings';

const loginPath = '/user/login';

export async function getInitialState(): Promise<initialState> {
  const initialState: initialState = {
    currentUser: undefined,
  };

  const { location } = history;
  if (location.pathname !== loginPath) {
    const res = await getUserInfo();
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
    footerRender: () => (
        <Footer />
    ),
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
