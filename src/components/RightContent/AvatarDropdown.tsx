import { BulbOutlined, HistoryOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { history, Link, useModel } from '@umijs/max';
import { Avatar, Button, Flex, MenuProps, Space, Tag } from 'antd';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import { flushSync } from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';
import { userLogoutUsingPost } from '@/services/onlinejudge-user-service/userController';

const styles = {
  container: {
    padding: '10px 16px',
    width: 250,
  },
  infoWrapper: {
    marginLeft: 12,
    flex: 1,
  },
  usernameRoleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  username: {
    fontWeight: 600,
    fontSize: 16,
    color: 'black',
  },
  email: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
};

export const AvatarDropdown: React.FC = () => {
  const loginOut = async () => {
    await userLogoutUsingPost();
    localStorage.clear();
    const { search, pathname } = window.location;
    const urlParams = new URL(window.location.href).searchParams;
    const redirect = urlParams.get('redirect');
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
        loginOut().then();
        return;
      }
      if (key === 'center') {
        history.push(`/account/${key}`);
      }
      if (key === 'history') {
        history.push('/history/question');
      }
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

  const userInfoItem = {
    key: 'userinfo',
    label: (
      <div style={styles.container}>
        <Flex align="center">
          <Avatar size={48} src={currentUser?.userPic} />
          <div style={styles.infoWrapper}>
            <div style={styles.usernameRoleRow}>
              <span style={styles.username}>{currentUser?.username}</span>
              <Tag color="processing" style={{ marginBottom: 0 }}>
                {currentUser?.userRole === 'admin' ? '管理员' : '用户'}
              </Tag>
            </div>
            <div style={styles.email}>{currentUser?.userEmail || '邮箱未设置'}</div>
          </div>
        </Flex>
      </div>
    ),
    disabled: true,
  };

  const menuItems: MenuProps['items'] = [
    userInfoItem,
    {
      type: 'divider',
    },
    {
      key: 'center',
      icon: <UserOutlined />,
      label: <span style={{ fontSize: 14 }}>个人中心</span>,
    },
    {
      key: 'history',
      icon: <HistoryOutlined />,
      label: <span style={{ fontSize: 14 }}>提交记录</span>,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: <span style={{ fontSize: 14, color: 'red' }}>退出登录</span>,
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
      <Space style={{ cursor: 'pointer' }}>
        {currentUser?.userPic ? (
          <Avatar size={'small'} src={currentUser.userPic} />
        ) : (
          <Avatar size={'small'} icon={<UserOutlined />} />
        )}
        <span style={{ fontWeight: 500 }}>{currentUser?.username ?? '未登录'}</span>
      </Space>
    </HeaderDropdown>
  );
};
