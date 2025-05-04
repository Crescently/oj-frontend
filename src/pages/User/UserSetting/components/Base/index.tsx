import { ProForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Input, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import useStyles from './index.style';
import { ProFormInstance } from '@ant-design/pro-form';
import AvatarView from '@/pages/User/UserSetting/components/Base/AvatarView';
import {
  getUserInfoUsingGet,
  updateUserInfoUsingPut,
} from '@/services/onlinejudge-user-service/userController';

const BaseView: React.FC = () => {
  const { styles } = useStyles();
  const formRef = useRef<ProFormInstance>();
  //  获取用户信息
  const [currentUser, setCurrentUser] = useState<API.UserVO>({});

  const getCurrentUser = async () => {
    const res = await getUserInfoUsingGet();
    if (res.code === 0 && res.data) {
      setCurrentUser(res.data);
      formRef.current?.setFieldsValue(res.data);
    } else {
      message.error(res.msg);
    }
  };

  useEffect(() => {
    getCurrentUser().then();
  }, []);

  const getAvatarURL = () => {
    if (currentUser) {
      if (currentUser.userPic) {
        return currentUser.userPic;
      }
      return 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
    }
    return '';
  };
  const handleFinish = async (value: API.UserUpdateInfoRequest) => {
    console.log(value);
    const res = await updateUserInfoUsingPut({
      id: currentUser.id,
      ...value,
    });
    if (res.code === 0) {
      message.success('更新基本信息成功');
    } else {
      message.error('更新失败' + res.msg);
    }
  };
  return (
    <div className={styles.baseView}>
      <>
        <div className={styles.left}>
          <ProForm
            layout="vertical"
            onFinish={handleFinish}
            submitter={{
              searchConfig: {
                submitText: '更新基本信息',
              },
              render: (_, dom) => dom[1],
            }}
            formRef={formRef}
            initialValues={currentUser}
            requiredMark={false}
          >
            <ProFormText
              width="md"
              name="userEmail"
              label="邮箱"
              rules={[
                {
                  required: true,
                  message: '请输入您的邮箱!',
                },
              ]}
            />
            <ProFormText
              width="md"
              name="username"
              label="昵称"
              rules={[
                {
                  required: true,
                  message: '请输入您的昵称!',
                },
              ]}
            />
            <ProFormTextArea
              name="signature"
              label="个性签名"
              rules={[
                {
                  required: true,
                  message: '请输入个性签名!',
                },
              ]}
              placeholder="个性签名"
            />
            <ProFormTextArea
              name="description"
              label="个人简介"
              rules={[
                {
                  required: true,
                  message: '请输入个人简介!',
                },
              ]}
              placeholder="个人简介"
            />
            <ProFormText
              width="md"
              name="address"
              label="住址"
              rules={[
                {
                  required: true,
                  message: '请输入您的住址!',
                },
              ]}
            />
            <ProFormText
              name="telephone"
              label="联系电话"
              rules={[
                {
                  required: true,
                  message: '请输入您的联系电话!',
                },
              ]}
            >
              <Input className={styles.phone_number} />
            </ProFormText>
          </ProForm>
        </div>
        <div className={styles.right}>
          <AvatarView avatar={getAvatarURL()} />
        </div>
      </>
    </div>
  );
};
export default BaseView;
