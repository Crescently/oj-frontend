import '@umijs/max';
import { message, Modal } from 'antd';
import React from 'react';
import { type ProColumns, ProTable } from '@ant-design/pro-components';
import { updateUser } from '@/services/onlinejudge-backend/adminController';

interface Props {
  oldData?: API.UserVO;
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  columns: ProColumns<API.UserVO>[];
}

const UpdateUserForm: React.FC<Props> = (props) => {
  const { visible, onSubmit, onCancel, columns, oldData } = props;
  if (!oldData) {
    return <></>;
  }
  const handleUpdate = async (fields: API.UserInfoUpdateRequest) => {
    const hide = message.loading('正在更新');
    try {
      await updateUser({
        id: oldData.id,
        ...fields,
      });
      hide();
      message.success('更新成功');
      return true;
    } catch (error) {
      hide();
      message.error('更新失败');
      return false;
    }
  };

  return (
    <Modal
      destroyOnClose
      title={'更新用户'}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        type={'form'}
        columns={columns}
        form={{
          initialValues: oldData,
        }}
        onSubmit={async (values) => {
          const success = await handleUpdate(values);
          if (success) {
            onSubmit(values);
          }
        }}
      />
    </Modal>
  );
};
export default UpdateUserForm;
