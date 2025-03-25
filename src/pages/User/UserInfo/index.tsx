import React from 'react';
import { useModel } from '@@/exports';
import { Descriptions, DescriptionsProps } from 'antd';

const UserInfo: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const loginUser = initialState?.currentUser;
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '账号',
      children: loginUser?.userAccount,
    },
    {
      key: '2',
      label: '用户名',
      children: loginUser?.username,
      span: 2,
    },
  ];

  return (
    <>
      <Descriptions title="User Info" bordered items={items} />
    </>
  );
};
export default UserInfo;
