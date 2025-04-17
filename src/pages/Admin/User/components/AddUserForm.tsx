import '@umijs/max';
import { message, Modal } from 'antd';
import React from 'react';
import { type ProColumns, ProTable } from '@ant-design/pro-components';
import { addUser } from '@/services/onlinejudge-backend/adminController';

interface Props {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  columns: ProColumns<API.UserVO>[];
}

const AddUserForm: React.FC<Props> = (props) => {
  const { visible, onSubmit, onCancel, columns } = props;

  const handleAdd = async (fields: API.UserAddRequest) => {
    const hide = message.loading('正在添加');
    try {
      await addUser({
        ...fields,
      });
      hide();
      message.success('添加成功');
      return true;
    } catch (error) {
      hide();
      message.error('添加失败');
      return false;
    }
  };

  return (
    <Modal
      destroyOnClose
      title={'添加用户'}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel();
      }}
    >
      <ProTable
        type={'form'}
        columns={columns}
        onSubmit={async (values) => {
          const success = await handleAdd(values);
          if (success) {
            onSubmit(values);
          }
        }}
      />
    </Modal>
  );
};
export default AddUserForm;
