import { PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { listQuestionSubmitVoByPageUsingPost } from '@/services/onlinejudge-question-service/questionController';
import React from 'react';
import { Space, Tag, Tooltip } from 'antd';
import Typography from 'antd/lib/typography';
import { history } from '@@/core/history';
import { useModel } from '@umijs/max';
import { ClockCircleOutlined, DatabaseOutlined, MessageOutlined } from '@ant-design/icons';

const QuestionHistory: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  const columns: ProColumns<API.QuestionSubmitVO>[] = [
    {
      title: '题目名称',
      render: (_, record) => (
        <Tooltip title={record.questionVO?.title}>
          <Typography.Text
            style={{
              display: 'block',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            strong
          >
            {record.questionVO?.title}
          </Typography.Text>
        </Tooltip>
      ),
      ellipsis: true,
      width: 260,
      align: 'center',
    },
    {
      title: '使用语言',
      dataIndex: 'language',
      valueType: 'text',
      width: 120,
      align: 'center',
    },
    {
      title: '判题信息',
      dataIndex: 'judgeInfo',
      width: 260,
      align: 'center',
      render: (_, record) => {
        const { message, memory, time } = record.judgeInfo || {};
        const formatMemory = memory ? `${memory} KB` : null;
        const formatTime = time ? `${time} ms` : null;

        return (
          <Space size={12} wrap>
            {message && (
              <Tooltip title={'判题信息'}>
                <Typography.Text
                  strong
                  type={message === '成功' ? 'success' : 'danger'}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <MessageOutlined style={{ marginRight: 6 }} />
                  {message}
                </Typography.Text>
              </Tooltip>
            )}

            {formatMemory && (
              <Tooltip title={'消耗内存'}>
                <Typography.Text type="secondary" style={{ display: 'flex', alignItems: 'center' }}>
                  <DatabaseOutlined style={{ marginRight: 6, color: '#1890ff' }} />
                  {formatMemory}
                </Typography.Text>
              </Tooltip>
            )}

            {formatTime && (
              <Tooltip title={'执行时间'}>
                <Typography.Text type="secondary" style={{ display: 'flex', alignItems: 'center' }}>
                  <ClockCircleOutlined style={{ marginRight: 6, color: '#52c41a' }} />
                  {formatTime}
                </Typography.Text>
              </Tooltip>
            )}
          </Space>
        );
      },
      hideInSearch: true,
    },
    {
      title: '题目状态',
      dataIndex: 'status',
      width: 120,
      align: 'center',
      hideInSearch: true,
      valueEnum: {
        0: {
          text: <Tag color={'blue'}> 等待中</Tag>,
        },
        1: {
          text: <Tag color={'yellow'}> 判题中</Tag>,
        },
        2: {
          text: <Tag color={'green'}> 成功</Tag>,
        },
        3: {
          text: <Tag color={'red'}> 失败</Tag>,
        },
      },
    },
    {
      title: '提交时间',
      dataIndex: 'createTime',
      valueType: 'date',
      width: 140,
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 110,
      align: 'center',
      render: (_, record) => (
        <Typography.Link
          onClick={() => {
            history.push(`/submit/question/${record.questionId}`);
          }}
        >
          查看题目详情
        </Typography.Link>
      ),
    },
  ];

  return (
    <PageContainer title={'提交记录'}>
      <ProTable<API.QuestionSubmitVO, API.QuestionSubmitQueryRequest>
        rowKey="id"
        search={false}
        pagination={{
          pageSize: 10,
        }}
        request={async (params) => {
          const res = await listQuestionSubmitVoByPageUsingPost({
            ...params,
            userId: initialState?.currentUser?.id ?? 0,
          });
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

export default QuestionHistory;
