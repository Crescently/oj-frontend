import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { Helmet, history } from '@umijs/max';
import { message } from 'antd';
import React from 'react';
import { createStyles } from 'antd-style';
import { MyDivider } from '@/components';
import { userRegisterUsingPost } from '@/services/onlinejudge-user-service/userController';

const useStyles = createStyles(() => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundSize: '100% 100%',
    },
  };
});

const Register: React.FC = () => {
  const { styles } = useStyles();

  const handleSubmit = async (values: API.UserRegisterRequest) => {
    // 注册
    const res = await userRegisterUsingPost(values);
    if (res.code === 0) {
      const defaultRegisterSuccessMessage = '注册成功！';
      message.success(defaultRegisterSuccessMessage);
      history.push('/user/login');
      return;
    } else {
      const defaultRegisterFailureMessage = res.msg;
      message.error(defaultRegisterFailureMessage);
    }
  };
  return (
    <div className={styles.container}>
      <Helmet>
        <title>{'用户注册'}</title>
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
          title="用户注册"
          onFinish={async (values) => {
            await handleSubmit(values as API.UserRegisterRequest);
          }}
          submitter={{
            searchConfig: {
              submitText: '注册',
            },
          }}
        >
          <>
            <MyDivider height={64} />
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
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined />,
              }}
              placeholder={'请输入用户名'}
              rules={[
                {
                  required: true,
                  message: '用户名是必填项！',
                },
                {
                  min: 1,
                  message: '用户名长度不能少于1个字符！',
                },
                {
                  max: 10,
                  message: '用户名长度不能超过10个字符！',
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
            <ProFormText.Password
              name="checkPassword"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined />,
              }}
              placeholder={'请确认密码'}
              rules={[
                {
                  required: true,
                  message: '密码是必填项！',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('userPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次输入的密码不匹配！'));
                  },
                }),
              ]}
            />
            <ProFormText
              name="userEmail"
              fieldProps={{
                size: 'large',
                prefix: <MailOutlined />,
              }}
              placeholder={'请输入邮箱'}
              rules={[
                {
                  required: true,
                  message: '邮箱是必填项！',
                },
                {
                  type: 'email',
                  message: '请输入有效的邮箱地址！',
                },
              ]}
            />
          </>
          <div
            style={{
              marginBottom: 24,
              textAlign: 'right',
            }}
          >
            <a
              onClick={() => {
                history.push('/user/login');
              }}
            >
              已有账号？去登录
            </a>
          </div>
        </LoginForm>
      </div>
    </div>
  );
};
export default Register;
