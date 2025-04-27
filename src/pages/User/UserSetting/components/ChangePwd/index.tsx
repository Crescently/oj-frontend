import { ProForm, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import { updatePassword } from '@/services/onlinejudge-backend/userController';
import React, { useEffect, useState } from 'react';
import { history, useModel } from '@@/exports';

const ChangePwd: React.FC = () => {
  //  获取用户信息
  const [currentUser, setCurrentUser] = useState<API.UserVO>({});

  const { initialState } = useModel('@@initialState');

  useEffect(() => {
    if (!initialState) {
      message.error('未登录').then();
      history.push('/user/login');
    } else {
      setCurrentUser({
        ...initialState.currentUser,
      });
    }
  });

  const handleFinish = async (value: API.UserUpdatePwdRequest) => {
    console.log(value);
    const res = await updatePassword({
      userId: currentUser.id,
      ...value,
    });
    if (res.code === 0) {
      message.success('更新密码成功，请重新登录');
      history.push('/user/login');
    } else {
      message.error('更新失败' + res.msg);
    }
  };
  return (
    <div>
      <ProForm
        layout="vertical"
        onFinish={handleFinish}
        submitter={{
          searchConfig: {
            submitText: '更新密码',
          },
          render: (_, dom) => dom[1],
        }}
        requiredMark={false}
      >
        <ProFormText.Password
          width="md"
          name="oldPassword"
          label="旧密码"
          rules={[
            {
              required: true,
              message: '请输入您的旧密码!',
            },
          ]}
        />
        <ProFormText.Password
          width="md"
          name="newPassword"
          label="新密码"
          rules={[
            {
              required: true,
              message: '请输入您的新密码!',
            },
          ]}
        />
        <ProFormText.Password
          width="md"
          name="rePassword"
          label="确认新密码"
          rules={[
            {
              required: true,
              message: '请确认新密码!',
            },
          ]}
        />
      </ProForm>
    </div>
  );
};

export default ChangePwd;
