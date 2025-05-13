import {
  type ActionType,
  PageContainer,
  type ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { message, Space, Tag, Typography } from 'antd';
import { deleteUserUsingDelete } from '@/services/onlinejudge-user-service/adminController';
import React, { useRef } from 'react';
import { listPostVoByPageUsingPost } from '@/services/onlinejudge-post-service/postController';
import TagInput from '@/pages/Question/AddQuestion/components/TagInput';
import { history } from '@@/core/history';

const PostManage = () => {
  const actionRef = useRef<ActionType>();

  const handleDelete = async (row: API.PostVO) => {
    const hide = message.loading('正在删除');
    if (!row) {
      return true;
    }
    try {
      await deleteUserUsingDelete({
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
  const columns: ProColumns<API.PostVO>[] = [
    {
      title: '帖子ID',
      dataIndex: 'id',
      valueType: 'index',
      hideInSearch: true,
    },
    {
      title: '标题',
      dataIndex: 'title',
      valueType: 'text',
    },
    {
      title: '标签',
      dataIndex: 'tags',
      render: (_, record) => {
        if (record?.tags) {
          return (
            <Space size={4}>
              {record?.tags.map((tag, index) => (
                <Tag key={index} color={'green'} style={{ margin: '2px 4px 2px 0' }}>
                  {tag.trim()}
                </Tag>
              ))}
            </Space>
          );
        }
        return null;
      },
      renderFormItem: () => {
        return <TagInput />;
      },
    },
    {
      title: '点赞数',
      dataIndex: 'thumbNum',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '收藏数',
      dataIndex: 'favourNum',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '创建者',
      dataIndex: ['userVO', 'username'],
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '浏览量',
      dataIndex: 'viewCount',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'date',
      hideInSearch: true,
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
              history.push(`/post/update/${record.id}`);
            }}
          >
            修改
          </Typography.Link>
          <Typography.Link
            type={'danger'}
            key={'delete'}
            onClick={() => {
              handleDelete(record).then();
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
      <ProTable<API.PostVO, API.PostQueryRequest>
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={async (params) => {
          const res = await listPostVoByPageUsingPost(params);
          if (res.data) {
            return {
              data: res.data.records,
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
    </PageContainer>
  );
};

export default PostManage;
