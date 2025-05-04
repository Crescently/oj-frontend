import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { history, Link, useModel } from '@umijs/max';
import { Avatar, Button, Space } from 'antd';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import { flushSync } from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';
import { userLogoutUsingPost } from '@/services/onlinejudge-user-service/userController';

export const AvatarDropdown: React.FC = () => {
  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    await userLogoutUsingPost();
    localStorage.clear();
    const { search, pathname } = window.location;
    const urlParams = new URL(window.location.href).searchParams;
    /** 此方法会跳转到 redirect 参数所在的位置 */
    const redirect = urlParams.get('redirect');
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: pathname + search,
        }),
      });
    }
  };

  const { initialState, setInitialState } = useModel('@@initialState');

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        flushSync(() => {
          setInitialState((s: any) => ({ ...s, currentUser: undefined }));
        });
        loginOut();
        return;
      }
      history.push(`/account/${key}`);
    },
    [setInitialState],
  );
  const { currentUser } = initialState || {};

  if (!currentUser) {
    return (
      <Link to={'/user/login'}>
        <Button type={'primary'} shape={'round'}>
          登录
        </Button>
      </Link>
    );
  }

  const menuItems = [
    {
      key: 'center',
      icon: <UserOutlined />,
      label: '个人中心',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
    >
      <Space>
        {currentUser?.userPic ? (
          <Avatar size={'small'} src={currentUser.userPic} />
        ) : (
          <Avatar size={'small'} icon={<UserOutlined />} />
        )}
        <span className="anticon">{currentUser?.username ?? '未登录'}</span>
      </Space>
    </HeaderDropdown>
  );
};
