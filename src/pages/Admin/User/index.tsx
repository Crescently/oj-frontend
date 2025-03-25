import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, message, Space, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import { deleteUser, listUserByPage } from '@/services/onlinejudge-backend/adminController';
import AddUserForm from '@/pages/Admin/User/components/AddUserForm';
import UpdateUserForm from '@/pages/Admin/User/components/UpdateUserForm';

const UserManagePage: React.FC = () => {
  const [addUserFormOpen, setAddUserFormOpen] = useState<boolean>(false);
  const [updateUserFormOpen, setUpdateUserFormOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.ListUserInfoResponse>();
  const [userQueryParams, setUserQueryParams] = useState({
    userAccount: '',
    username: '',
    userRole: '',
  });

  const handleDelete = async (row: API.ListUserInfoResponse) => {
    const hide = message.loading('正在删除');
    if (!row) {
      return true;
    }
    try {
      await deleteUser({
        id: row.id,
      });
      hide();
      message.success('删除成功');
      //重新加载表格
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('删除失败' + error.message);
      return false;
    }
  };

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.ListUserInfoResponse>[] = [
    {
      title: '用户ID',
      dataIndex: 'id',
      valueType: 'index',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '用户账号',
      dataIndex: 'userAccount',
      valueType: 'text',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      valueType: 'text',
    },
    {
      title: '用户邮箱',
      dataIndex: 'userEmail',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '用户简介',
      dataIndex: 'description',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '用户权限',
      dataIndex: 'userRole',
      valueEnum: {
        user: {
          text: '用户',
        },
        admin: {
          text: '管理员',
        },
        ban: {
          text: '封禁中',
        },
        all: {
          text: '所有',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size={'middle'}>
          <Typography.Link
            key={'update'}
            onClick={() => {
              setUpdateUserFormOpen(true);
              setCurrentRow(record);
            }}
          >
            修改
          </Typography.Link>
          <Typography.Link
            type={'danger'}
            key={'delete'}
            onClick={() => {
              handleDelete(record);
            }}
          >
            删除
          </Typography.Link>
        </Space>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.ListUserInfoResponse, API.UserQueryRequest>
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        params={userQueryParams}
        onSubmit={(params) => {
          // 获取搜索框的数据
          const { userAccount, username, userRole } = params;
          setUserQueryParams((prevState) => {
            return {
              ...prevState,
              userAccount: userAccount || '',
              username: username || '',
              userRole: userRole === 'all' ? '' : userRole || '',
            };
          });
          // 由于 setUserQueryParams 是异步的，直接使用更新后的 params 进行操作
          actionRef.current?.reload();
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setAddUserFormOpen(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params) => {
          const newParams = {
            ...params,
            current: 1,
            pageSize: 10,
          };
          const res = await listUserByPage(newParams);
          if (res.data) {
            return {
              data: res.data.items,
              success: true,
              total: res.data.total,
            };
          } else {
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}
        columns={columns}
      />
      <AddUserForm
        visible={addUserFormOpen}
        onCancel={() => {
          setAddUserFormOpen(false);
        }}
        onSubmit={() => {
          setAddUserFormOpen(false);
          actionRef.current?.reload();
        }}
        columns={columns}
      />
      <UpdateUserForm
        visible={updateUserFormOpen}
        onCancel={() => {
          setUpdateUserFormOpen(false);
        }}
        onSubmit={() => {
          setUpdateUserFormOpen(false);
          setCurrentRow(undefined);
          actionRef.current?.reload();
        }}
        columns={columns}
        oldData={currentRow}
      />
    </PageContainer>
  );
};
export default UserManagePage;
