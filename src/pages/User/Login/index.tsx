import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { Helmet, history, useModel } from '@umijs/max';
import { message, Tabs } from 'antd';
import React, { useState } from 'react';
import { createStyles } from 'antd-style';
import { userLoginUsingPost } from '@/services/onlinejudge-user-service/userController';

const useStyles = createStyles(() => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage: 'url(/bgc.jpg)',
      backgroundSize: '100% 100%',
    },
  };
});

const Login: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const { styles } = useStyles();

  const handleSubmit = async (values: API.UserLoginRequest) => {
    // 登录
    const res = await userLoginUsingPost({
      ...values,
    });
    if (res.code === 0) {
      const defaultLoginSuccessMessage = '登录成功！';
      message.success(defaultLoginSuccessMessage);
      setInitialState({
        ...initialState,
        currentUser: res.data,
      });
      const urlParams = new URL(window.location.href).searchParams;
      history.push(urlParams.get('redirect') || '/');
      return;
    } else {
      const defaultLoginFailureMessage = res.msg;
      message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <div className={styles.container}>
      <Helmet>
        <title>{'用户登录'}</title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '128px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="React 通用模版"
          subTitle={'副标题'}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserLoginRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '账户密码登录',
              },
            ]}
          />
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入账号'}
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                  {
                    min: 5,
                    message: '账号长度不能少于5个字符！',
                  },
                  {
                    max: 16,
                    message: '账号长度不能超过16个字符！',
                  },
                  {
                    pattern: /^[a-zA-Z0-9]+$/,
                    message: '账号只能包含字母和数字！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 5,
                    message: '密码长度不能少于5个字符！',
                  },
                  {
                    max: 16,
                    message: '密码长度不能超过16个字符！',
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
              textAlign: 'right',
            }}
          >
            <a
              onClick={() => {
                history.push('/user/register');
              }}
            >
              新用户注册
            </a>
          </div>
        </LoginForm>
      </div>
    </div>
  );
};
export default Login;
